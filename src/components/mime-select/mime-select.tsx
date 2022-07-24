import { Fragment, useCallback, useState } from 'react';
import { Card, Text } from '@nextui-org/react';
import { Image as ImageIcon, Video as VideoIcon, Voice as VoiceIcon } from 'react-iconly';
import { Mime } from '@components';
import { selectedCardStyles, StyledLabel, StyledMime, StyledMimeContainer } from './mime-select.styles';
import type { FC } from 'react';

export const MimeSelect: FC<MimeSelectProps> = (props: MimeSelectProps) => {
  const {} = props;

  const [mime, setMime] = useState<Mime>('image');

  const mimeChangeHandler = useCallback((value: Mime) => {
    setMime(value);
  }, []);

  const getMimeCardStyles = useCallback(
    (value: Mime) => {
      return mime === value ? selectedCardStyles : undefined;
    },
    [mime]
  );

  return (
    <Fragment>
      <StyledMimeContainer>
        <StyledLabel className="nextui-input-block-label">Type</StyledLabel>
        <StyledMime>
          <Card
            isPressable
            variant="bordered"
            className="mime-card"
            css={getMimeCardStyles('image')}
            onClick={() => mimeChangeHandler('image')}
          >
            <Card.Body className="mime-card-body">
              <ImageIcon primaryColor="currentColor" set="bulk" />
            </Card.Body>
            <Card.Footer className="mime-card-footer">
              <Text className="mime-card-text" b>
                Image
              </Text>
            </Card.Footer>
          </Card>
          <Card
            isPressable
            variant="bordered"
            className="mime-card"
            css={getMimeCardStyles('audio')}
            onClick={() => mimeChangeHandler('audio')}
          >
            <Card.Body className="mime-card-body">
              <VoiceIcon primaryColor="currentColor" set="bulk" />
            </Card.Body>
            <Card.Footer className="mime-card-footer">
              <Text className="mime-card-text" b>
                Audio
              </Text>
            </Card.Footer>
          </Card>
          <Card
            isPressable
            variant="bordered"
            className="mime-card"
            css={getMimeCardStyles('video')}
            onClick={() => mimeChangeHandler('video')}
          >
            <Card.Body className="mime-card-body">
              <VideoIcon primaryColor="currentColor" set="bulk" />
            </Card.Body>
            <Card.Footer className="mime-card-footer">
              <Text className="mime-card-text" b>
                Video
              </Text>
            </Card.Footer>
          </Card>
        </StyledMime>
      </StyledMimeContainer>
    </Fragment>
  );
};

interface MimeSelectProps {}
