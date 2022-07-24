// import { Folder as FolderIcon } from 'react-iconly';
// import { previewImage } from './dropzone.styles';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Card, Progress, Row, Text } from '@nextui-org/react';
import { Folder as FolderIcon } from 'react-iconly';
import { previewAudio } from './dropzone.styles';
import type { FC } from 'react';

export const PreviewAudio: FC<PreviewAudioProps> = (props: PreviewAudioProps) => {
  const { file, open } = props;

  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const audioURL = useMemo(() => {
    return URL.createObjectURL(file);
  }, [file]);

  const audio = useMemo(() => {
    return new Audio(audioURL);
  }, [audioURL]);

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

  const openFileExplorer = useCallback(() => {
    cleanState();
    open();
  }, [open, cleanState]);

  return (
    <Fragment>
      <Card variant="bordered" css={previewAudio.card}>
        <Card.Header css={previewAudio.header}>
          <Row justify="space-between" align="center">
            <Text css={previewAudio.text} b size={14}>
              {file.name}
            </Text>
            <Text css={previewAudio.text} size={12} transform="uppercase">
              {`${(file.size / (1024 * 1024)).toFixed(2)} MB`}
            </Text>
          </Row>
        </Card.Header>
        <Card.Body css={previewAudio.body}>
          <Row>
            <Progress css={previewAudio.progress} size="sm" max={duration} value={currentTime} />
          </Row>
          <Row justify="space-between" css={{ py: '$6', px: '$1' }}>
            <Text b size={14} css={{ color: '#FF4ECD' }}>
              {currentTime && !isNaN(currentTime) && formatDuration(currentTime)}
            </Text>
            <Text b size={14} css={{ color: '$accents6' }}>
              {duration && !isNaN(duration) && formatDuration(duration)}
            </Text>
          </Row>
        </Card.Body>
        <Card.Footer css={previewAudio.footer}>
          <Row justify="space-between" align="center">
            <Button auto bordered onClick={() => togglePlay()}>
              {isPlay ? 'Pause' : 'Play'}
            </Button>
            <Button
              auto
              flat
              rounded
              color="secondary"
              icon={<FolderIcon primaryColor="currentColor" set="light" />}
              onClick={() => openFileExplorer()}
            >
              Change
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

interface PreviewAudioProps {
  file: File;
  open: () => void;
}
