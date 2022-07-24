import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Loading, Progress, Row, Text } from '@nextui-org/react';
import { parseEther } from 'ethers/lib/utils';
import { default as useDownloader } from 'react-use-downloader';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { useToast } from '@components/provider';
import { contract } from '@lib';
import { cardStyles } from './nft-card.styles';
import type { NFTItem } from '@lib';
import type { FC } from 'react';

export const NFTCard: FC<NFTCardProps> = (props: NFTCardProps) => {
  const { item, rentable, downloadable, withdrawable } = props;

  const { percentage, isInProgress, download, cancel } = useDownloader();

  const { showToast } = useToast();

  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const contractDelegate = useContractWrite({
    ...contract.muse.config,
    functionName: 'delegate'
  });

  const waitContractDelegate = useWaitForTransaction({
    wait: contractDelegate.data?.wait,
    hash: contractDelegate.data?.hash,
    onError: () => showToast('Error', 'Rent error, please try again.'),
    onSuccess: () => showToast('Success', 'Rent success.')
  });

  const isLoading = useMemo<boolean>(() => {
    return Boolean(contractDelegate.isLoading || waitContractDelegate.isLoading);
  }, [contractDelegate.isLoading, waitContractDelegate.isLoading]);

  const audio = useMemo(() => {
    return new Audio(`https://nftstorage.link/ipfs/${item.ipfsCID}/${item.audio.name}`);
  }, [item.ipfsCID, item.audio.name]);

  const loadedMetadataHandler = useCallback(() => {
    setDuration(audio.duration);
  }, [audio]);

  const timeUpdateHandler = useCallback(() => {
    setCurrentTime(audio.currentTime);
  }, [audio]);

  const cleanState = useCallback(() => {
    audio.pause();
    setDuration(0);
    setCurrentTime(0);
    setIsPlay(false);
  }, [audio, setDuration, setCurrentTime, setIsPlay]);

  useEffect(() => {
    audio.addEventListener('loadedmetadata', loadedMetadataHandler);
    audio.addEventListener('timeupdate', timeUpdateHandler);

    return () => {
      audio.removeEventListener('loadedmetadata', loadedMetadataHandler);
      audio.removeEventListener('timeupdate', timeUpdateHandler);
      cleanState();
    };
  }, [audio, loadedMetadataHandler, timeUpdateHandler, cleanState]);

  const formatDuration = useCallback((secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }, []);

  const togglePlay = useCallback(async () => {
    if (isPlay) {
      audio.pause();
      setIsPlay(false);
    } else {
      audio.volume = 0.6;
      await audio.play();
      setIsPlay(true);
    }
  }, [audio, isPlay]);

  const rentHandler = useCallback(async () => {
    cleanState();
    if (isLoading) return;
    await contractDelegate.writeAsync({ args: [item.tokenID], overrides: { value: parseEther(item.price) } });
  }, [cleanState, contractDelegate, isLoading, item.tokenID, item.price]);

  const toggleDownloadHandler = useCallback(async () => {
    if (isInProgress) return cancel();
    await download(audio.currentSrc, `${item.name}.${item.audio.type.split('/')[1]}`);
  }, [isInProgress, audio.currentSrc, item.name, item.audio.type, cancel, download]);

  return (
    <Fragment>
      <Card variant="bordered" css={cardStyles.card}>
        <Card.Header css={cardStyles.header}>
          <Row justify="space-between" align="center">
            <Col>
              <Text h4 css={{ color: '$primarySolidContrast', ...cardStyles.text }}>
                {item.name}
              </Text>
              <Text size={12} css={{ color: '$primarySolidContrast', ...cardStyles.text }}>
                {item.description}
              </Text>
            </Col>
            <Col>
              <Row justify="flex-end">
                <Text b size={14} css={{ color: '$primarySolidContrast', ...cardStyles.text }}>
                  -{formatDuration(duration - currentTime)}
                </Text>
              </Row>
            </Col>
          </Row>
          <Progress css={cardStyles.progress} size="xs" max={duration} value={currentTime} />
        </Card.Header>
        <Card.Body css={cardStyles.body}>
          <Card.Image
            width="100%"
            height="100%"
            objectFit="cover"
            alt={item.thumbnail.name}
            src={`https://nftstorage.link/ipfs/${item.ipfsCID}/${item.thumbnail.name}`}
          />
        </Card.Body>
        <Card.Footer isBlurred css={cardStyles.footer}>
          <Col>
            <Row justify="flex-start" align="center">
              <Button auto light onClick={() => togglePlay()}>
                {isPlay ? 'Pause' : 'Play'}
              </Button>
            </Row>
          </Col>
          <Col>
            <Row justify="flex-end" align="center" css={{ gap: '$sm' }}>
              <Text css={cardStyles.text} size={12} b>
                {item.price} MATIC
              </Text>

              {rentable && (
                <Button
                  css={{ '.nextui-button-text': { dflex: 'center', gap: '$md' } }}
                  color="secondary"
                  flat
                  auto
                  onClick={() => rentHandler()}
                >
                  {isLoading ? <Loading color="currentColor" size="sm" /> : 'Rent'}
                </Button>
              )}

              {downloadable && (
                <Button
                  css={{ '.nextui-button-text': { dflex: 'center', gap: '$md' } }}
                  color="secondary"
                  flat
                  auto
                  onClick={() => toggleDownloadHandler()}
                >
                  {isInProgress ? (
                    <>
                      <Loading color="currentColor" size="sm" />
                      {`${percentage}%`}
                    </>
                  ) : (
                    'Download'
                  )}
                </Button>
              )}

              {withdrawable && (
                <Button
                  css={{ '.nextui-button-text': { dflex: 'center', gap: '$md' } }}
                  color="secondary"
                  flat
                  auto
                  onClick={() => {}}
                >
                  {isLoading ? <Loading color="currentColor" size="sm" /> : 'Withdraw'}
                </Button>
              )}
            </Row>
          </Col>
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

interface NFTCardProps {
  item: NFTItem;
  rentable?: boolean;
  downloadable?: boolean;
  withdrawable?: boolean;
}
