import { forwardRef, Fragment, useMemo } from 'react';
import { Card, Text } from '@nextui-org/react';
import { useDropzone } from 'react-dropzone';
import {
  cardBodyStyles,
  cardStyles,
  StyledCard,
  StyledContainer,
  StyledHelperText,
  StyledHelperTextContainer,
  StyledLabel
} from './dropzone.styles';
import { PreviewAudio } from './preview-audio';
import { PreviewImage } from './preview-image';
import type { StyledContainerVariantProps } from './dropzone.styles';
import type { InputProps } from '@nextui-org/react';
import type { ForwardedRef, ForwardRefRenderFunction, ReactNode } from 'react';
import type { Accept } from 'react-dropzone';

export const DropzoneForwardRef: ForwardRefRenderFunction<HTMLDivElement, DropzoneProps> = (
  props: DropzoneProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const {
    file,
    label,
    status,
    onDrop,
    helperText,
    helperColor,
    rejectTip = 'File is not accepted',
    activeTip = 'Drop the files here ...',
    accept = { 'image/*': ['.jpeg', '.png'] },
    tip = 'Drag drop some files here or click to select files'
  } = props;

  const { getRootProps, open, isDragActive, isDragReject } = useDropzone({
    accept,
    onDrop,
    maxFiles: 1,
    noKeyboard: true
  });

  const dndTip = useMemo<ReactNode>(() => {
    return <Text className="tip">{isDragActive ? activeTip : tip}</Text>;
  }, [isDragActive, activeTip, tip]);

  const errorTip = useMemo<ReactNode | undefined>(() => {
    if (isDragReject) return <Text color="error">{rejectTip}</Text>;
  }, [isDragReject, rejectTip]);

  return (
    <Fragment>
      <StyledContainer ref={ref} status={status} helperColor={helperColor}>
        {label && <StyledLabel>{label}</StyledLabel>}
        {file ? (
          file.type.includes('audio') ? (
            <PreviewAudio file={file} open={() => open()} />
          ) : (
            <PreviewImage file={file} open={() => open()} />
          )
        ) : (
          <StyledCard css={cardStyles} active={isDragActive} isPressable {...getRootProps()}>
            <Card.Body css={cardBodyStyles}>
              {dndTip}
              {errorTip}
            </Card.Body>
          </StyledCard>
        )}
        <StyledHelperTextContainer withValue={!!helperText}>
          {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
        </StyledHelperTextContainer>
      </StyledContainer>
    </Fragment>
  );
};

export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(DropzoneForwardRef);

export type Mime = 'image' | 'audio' | 'video';

interface DropzoneProps extends StyledContainerVariantProps {
  file?: File;
  accept?: Accept;
  tip?: string;
  label?: string;
  activeTip?: string;
  rejectTip?: string;
  helperText?: InputProps['helperText'];
  onDrop?: (acceptedFiles: File[]) => void;
}
