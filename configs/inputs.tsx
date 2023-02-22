import React from 'react'
import { Image } from 'react-native'
import { InputParams, InputType } from '../models/input'
import { socialsIconUri } from './url'

export const createBrandInputs: InputParams[] = [
  {
    name: 'name',
    type: InputType.Text,
    label: 'Name',
    required: true,
    placeholder: 'Enter brand name',
  },
  {
    name: 'description',
    type: InputType.TextArea,
    label: 'Description',
    required: true,
    placeholder: 'Enter brand description',
  },
  {
    name: 'establishTime',
    type: InputType.Date,
    label: 'Establish Time',
    required: true,
    placeholder: 'Enter brand establish time',
  },
  {
    name: 'phoneNumber',
    type: InputType.Text,
    label: 'Phone Number',
    required: true,
    placeholder: 'Enter brand phone number',
  },
  {
    name: 'type',
    type: InputType.Select,
    label: 'Brand Type',
    required: true,
    placeholder: 'Enter brand type',
    selectOptions: [
      {
        label: 'Local Brand',
        value: 'local_brand',
      },
      {
        label: 'Global Brand',
        value: 'global_brand',
      },
    ],
  },
  {
    name: 'socials',
    type: InputType.InputGroup,
    label: 'Socials',
    required: true,
    groups: [
      {
        name: 'socials.facebook',
        icon: <Image source={{ uri: socialsIconUri?.facebook }} style={{ width: 20, height: 20, borderRadius: 100 }} />,
        type: InputType.Text,
        required: true,
        placeholder: 'Enter brand facebook url',
      },
      {
        name: 'socials.instagram',
        icon: (
          <Image source={{ uri: socialsIconUri?.instagram }} style={{ width: 20, height: 20, borderRadius: 100 }} />
        ),
        type: InputType.Text,
        required: true,
        placeholder: 'Enter brand instagram url',
      },
      {
        name: 'socials.tiktok',
        type: InputType.Text,
        icon: <Image source={{ uri: socialsIconUri?.tiktok }} style={{ width: 20, height: 20, borderRadius: 100 }} />,
        required: true,
        placeholder: 'Enter brand tiktok url',
      },
      {
        name: 'socials.shopee',
        type: InputType.Text,
        icon: <Image source={{ uri: socialsIconUri?.shopee }} style={{ width: 20, height: 20, borderRadius: 100 }} />,
        required: true,
        placeholder: 'Enter brand shopee url',
      },
      {
        name: 'socials.website',
        type: InputType.Text,
        icon: <Image source={{ uri: socialsIconUri?.website }} style={{ width: 20, height: 20, borderRadius: 100 }} />,
        required: true,
        placeholder: 'Enter brand website url',
      },
    ],
  },
  {
    name: 'addresses',
    type: InputType.InputList,
    label: 'Addresses',
    required: true,
    placeholder: 'Enter brand addresses',
  },
  {
    name: 'logoUrl',
    type: InputType.Upload,
    label: 'Logo',
    required: true,
    placeholder: 'Enter brand addresses',
    uploadOptions: {
      isAvatar: true,
    },
  },
  {
    name: 'bannerUrl',
    type: InputType.Upload,
    label: 'Banner',
    required: true,
    placeholder: 'Enter brand addresses',
  },
]
