import { flatten, zip } from 'lodash';

export const BREAKPOINTS = {
    mobile: 480,
    mobileVertical: 760,
    tablet: 900,
    laptop: 1154,
    desktop: 1472,
    widescreen: 2000
};

export function isMobileWidth (windowWidth) {
    return windowWidth < BREAKPOINTS.tablet;
}

export const respondTo = (key, direction, dimension) => {
    return (style, ...variables) =>
        `@media (${direction || 'min'}-${dimension || 'width'
        }: ${BREAKPOINTS[key]}px) { ${flatten(zip(style, variables)).join('')} }`;
};
