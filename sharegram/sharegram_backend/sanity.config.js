import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
//import {googleMapsInput} from '@sanity/google-maps-input'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'sharegram_js',

  projectId: 'zcz3on1m',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
    //googleMapsInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  parts: 
    {
      implements: "part:@sanity/base/absolutes",
      path: "./bundleChecker.js",
    },
  
})
