import React from 'react'
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

export const createProductInputs: InputParams[] = [
  {
    name: 'name',
    type: InputType.Text,
    label: 'Name',
    required: true,
    placeholder: 'Enter product name',
  },
  {
    name: 'price',
    type: InputType.Number,
    label: 'Price',
    required: true,
    placeholder: 'Enter price',
  },
  {
    name: 'type',
    type: InputType.Text,
    label: 'Product type',
    required: true,
    placeholder: 'Enter type of product',
  },
  {
    name: 'technology',
    type: InputType.Text,
    label: 'Technology',
    required: true,
    placeholder: 'Enter product technology',
  },
  {
    name: 'status',
    type: InputType.Select,
    label: 'Status',
    required: true,
    placeholder: 'Enter status',
    selectOptions: [
      {
        label: 'Stocking',
        value: 'stocking',
      },
      {
        label: 'Out of stock',
        value: 'out-of-stock',
      },
    ],
  },
  {
    name: 'colors',
    type: InputType.InputList,
    label: 'Colors',
    required: true,
    placeholder: 'Enter product color',
  },
  {
    name: 'details',
    type: InputType.InputList,
    label: 'Details',
    required: true,
    placeholder: 'Enter product detail',
  },
  {
    name: 'material',
    type: InputType.InputList,
    label: 'Material',
    required: true,
    placeholder: 'Enter product material',
  },
  {
    name: 'form',
    type: InputType.Text,
    label: 'Form',
    required: true,
    placeholder: 'Enter product form',
  },
  {
    name: 'images',
    type: InputType.Upload,
    label: 'Images',
    required: true,
    placeholder: 'Enter product images',
    uploadOptions: {
      multiple: true,
    },
  },
]
