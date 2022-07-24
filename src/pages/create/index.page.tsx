import { Fragment, useCallback, useMemo } from 'react';
import { Button, Container, Input, Loading, Textarea } from '@nextui-org/react';
import { default as NextHead } from 'next/head';
import { useForm } from 'react-hook-form';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { Dropzone, useToast } from '@components';
import { useIPFS } from '@hooks';
import { contract } from '@lib';
import { buttonStyles, containerStyles, StyledForm } from './create.styles';
import type { NextPage } from 'next';
import type { FormEvent } from 'react';

const CreatePage: NextPage<CreatePageProps> = (props: CreatePageProps) => {
  const {} = props;

  const { showToast } = useToast();
  const { store, isStoreLoading } = useIPFS();

  const {
    reset,
    watch,
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateData>({ mode: 'onChange' });

  const contractMint = useContractWrite({
    ...contract.muse.config,
    functionName: 'mintNft'
  });

  const waitContractMint = useWaitForTransaction({
    wait: contractMint.data?.wait,
    hash: contractMint.data?.hash,
    onError: () => showToast('Error', 'Mint error, please try again.'),
    onSuccess: () => showToast('Success', 'Mint success.')
  });

  const isLoading = useMemo<boolean>(() => {
    return Boolean(contractMint.isLoading || waitContractMint.isLoading || isStoreLoading);
  }, [contractMint.isLoading, waitContractMint.isLoading, isStoreLoading]);

  const setFieldValue = useCallback(
    (name: 'thumbnail' | 'audio', value: File[]) => {
      if (Array.isArray(value) && value.length > 0) {
        setValue(name, value[0], { shouldValidate: true });
      }
    },
    [setValue]
  );

  const submitHandler = handleSubmit(async (data: CreateData) => {
    if (isLoading) return;
    const { name, description, price, thumbnail, audio } = data;
    const CID = await store({ name, description, price, thumbnail, audio });
    CID && console.log(`IPFS address: https://nftstorage.link/ipfs/${CID}`);
    await contractMint.writeAsync({ args: [CID] });
    reset();
    clearErrors();
  });

  return (
    <Fragment>
      <NextHead>
        <title>Mint | Muse - NFTs Rental Marketplace</title>
      </NextHead>
      <Container as="section" css={containerStyles} md>
        <StyledForm onSubmit={(event: FormEvent<HTMLFormElement>) => submitHandler(event)}>
          <Input
            size="lg"
            type="text"
            label="Name"
            placeholder="NFT name"
            helperText={errors.name?.message}
            status={errors.name ? 'error' : 'default'}
            helperColor={errors.name ? 'error' : 'default'}
            {...register('name', { required: 'Name is required' })}
          />
          <Textarea
            size="lg"
            minRows={2}
            maxRows={4}
            label="Description"
            placeholder="NFT Description"
            helperText={errors.description?.message}
            status={errors.description ? 'error' : 'default'}
            helperColor={errors.description ? 'error' : 'default'}
            {...register('description', { required: 'Description is required' })}
          />
          <Input
            size="lg"
            step="any"
            type="number"
            label="Price"
            labelRight="MATIC"
            placeholder="NFT Price"
            helperText={errors.price?.message}
            status={errors.price ? 'error' : 'default'}
            helperColor={errors.price ? 'error' : 'default'}
            {...register('price', { required: 'Price is required', min: { value: 0, message: 'Min 0 matic' } })}
          />

          <Dropzone
            label="Thumbnail"
            activeTip="Drop the image here ..."
            rejectTip="Image format is not accepted"
            accept={{ 'image/*': ['.jpeg', '.png'] }}
            tip="Drag drop image here or click to select image"
            file={watch('thumbnail')}
            helperText={errors.thumbnail?.message}
            status={errors.thumbnail ? 'error' : 'default'}
            helperColor={errors.thumbnail ? 'error' : 'default'}
            {...register('thumbnail', { required: 'Thumbnail is required' })}
            onDrop={(files: File[]) => setFieldValue('thumbnail', files)}
          />
          <Dropzone
            label="Audio"
            activeTip="Drop the audio here ..."
            rejectTip="Audio format is not accepted"
            accept={{ 'audio/*': ['.webm', '.weba', '.mp3', '.flac', '.wav', '.aac'] }}
            tip="Drag drop audio here or click to select audio"
            file={watch('audio')}
            helperText={errors.audio?.message}
            status={errors.audio ? 'error' : 'default'}
            helperColor={errors.audio ? 'error' : 'default'}
            {...register('audio', { required: 'Audio is required' })}
            onDrop={(files: File[]) => setFieldValue('audio', files)}
          />
          <Button type="submit" color="primary" size="lg" auto css={buttonStyles}>
            {isLoading && <Loading color="currentColor" size="sm" />}
            {isStoreLoading ? 'Uploading to IPFS...' : isLoading ? 'Creating and wait for transaction...' : 'Create'}
          </Button>
        </StyledForm>
      </Container>
    </Fragment>
  );
};

interface CreateData {
  name: string;
  description: string;
  price: number;
  thumbnail: File;
  audio: File;
}

interface CreatePageProps {}

export default CreatePage;
