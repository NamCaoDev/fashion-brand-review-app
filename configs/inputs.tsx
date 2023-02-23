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
        iconUrl: socialsIconUri?.facebook,
        type: InputType.Text,
        required: true,
        placeholder: 'Enter brand facebook url',
      },
      {
        name: 'socials.instagram',
        iconUrl: socialsIconUri?.instagram,
        type: InputType.Text,
        required: true,
        placeholder: 'Enter brand instagram url',
      },
      {
        name: 'socials.tiktok',
        type: InputType.Text,
        iconUrl: socialsIconUri?.tiktok,
        required: true,
        placeholder: 'Enter brand tiktok url',
      },
      {
        name: 'socials.shopee',
        type: InputType.Text,
        iconUrl: socialsIconUri?.shopee,
        required: true,
        placeholder: 'Enter brand shopee url',
      },
      {
        name: 'socials.website',
        type: InputType.Text,
        iconUrl: socialsIconUri?.website,
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
