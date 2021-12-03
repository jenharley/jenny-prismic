import { RichText } from 'prismic-reactjs';

export const toFeatureJson = (lighthouses) => {
    const features = [];
    lighthouses.results.map(lighthouse => {
        const latitude = lighthouse.data.location.latitude;
        const longitude = lighthouse.data.location.longitude;
        const name = RichText.asText(lighthouse.data.name);
        const description = RichText.asText(lighthouse.data.description);
        const colors = ['#f0b8b8', '#aecdc2', '#665191', '#a05195', '#88c9d4', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'];
        const fill = colors[Math.floor(Math.random() * colors.length)];

        features.push(
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                properties: {
                    name: name,
                    image: lighthouse.data.image,
                    description: description,
                    fill: fill
                }
            }
        );

        return features;
    });
    return features;
};
