import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import {visionTool} from '@sanity/vision'

export default createConfig({
  name: 'default',
  title: 'readoo',

  projectId: 'lzw8kb6x',
  dataset: 'production',

  plugins: [deskTool(), visionTool({defaultApiVersion: 'v2021-10-21', defaultDataset: 'production'})],

  schema: {
    types: schemaTypes,
  },
})
