import { Fragment, useMemo } from 'react';
import { Button, Card, Col, Row, Text } from '@nextui-org/react';
import { Folder as FolderIcon } from 'react-iconly';
import { previewImage } from './dropzone.styles';
import type { FC } from 'react';

export const PreviewImage: FC<PreviewImageProps> = (props: PreviewImageProps) => {
  const { file, open } = props;

  const previewSrc = useMemo(() => {
    return URL.createObjectURL(file);
  }, [file]);

  return (
    <Fragment>
      <Card variant="bordered" css={previewImage.card}>
        <Card.Body css={previewImage.body}>
          <Card.Image width="100%" height={400} objectFit="scale-down" alt={file.name} src={previewSrc} />
        </Card.Body>
        <Card.Footer css={previewImage.footer}>
          <Row justify="space-between" align="center">
            <Col css={previewImage.col}>
              <Text css={previewImage.text} size={12} weight="bold" transform="uppercase">
                {file.name}
              </Text>
              <Text css={previewImage.text} size={12} transform="uppercase">
                {`${(file.size / (1024 * 1024)).toFixed(2)} MB`}
              </Text>
            </Col>
            <Col>
              <Row justify="flex-end">
                <Button
                  auto
                  flat
                  rounded
                  color="secondary"
                  icon={<FolderIcon primaryColor="currentColor" set="light" />}
                  onClick={() => open()}
                >
                  Change
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

interface PreviewImageProps {
  file: File;
  open: () => void;
}
