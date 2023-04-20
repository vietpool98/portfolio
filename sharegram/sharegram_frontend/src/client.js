import sanityClient, { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: `${process.env.REACT_APP_SANITY_ID}`,
    dataset: 'production',
    apiVersion: '2022-01-12',
    useCdn: false,
    token : `${process.env.REACT_APP_SANITY_TOKEN}`,
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)