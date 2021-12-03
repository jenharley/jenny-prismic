import * as React from 'react';
import styled, { css } from 'styled-components';

const FONT_SIZES = {
    xlarge: 35,
    large: 28,
    medium: 20,
    small: 16,
    xsmall: 14,
    micro: 12,
    nano: 10
};

const FONT_WEIGHTS = {
    normal: 400,
    semiBold: 500,
    bold: 600
};

const LINE_HEIGHTS = {
    base: 1,
    small: 1.2,
    medium: 1.3,
    large: 1.4,
    xlarge: 1.55
};

const StyledTypography = styled.div`
    color: #222;
    margin: 0;

    ${props => props.color && css`
        color: ${props.color};
    `}

    ${props => props.variant === 'h1' && css`
        font-size: ${FONT_SIZES.xlarge}px;
        line-height: ${LINE_HEIGHTS.small};
        font-weight: ${FONT_WEIGHTS.semiBold};
    `}

    ${props => props.variant === 'h2' && css`
        font-size: ${FONT_SIZES.large}px;
        line-height: ${LINE_HEIGHTS.small};
        font-weight: ${FONT_WEIGHTS.semiBold};
    `}

    ${props => props.variant === 'h3' && css`
        font-size: ${FONT_SIZES.medium}px;
        line-height: ${LINE_HEIGHTS.small};
        font-weight: ${FONT_WEIGHTS.semiBold};
    `}

    ${props => props.variant === 'h4' && css`
        font-size: ${FONT_SIZES.small}px;
        line-height: ${LINE_HEIGHTS.small};
        font-weight: ${FONT_WEIGHTS.semiBold};
    `}

    ${props => props.variant === 'h5' && css`
        font-size: ${FONT_SIZES.xsmall}px;
        line-height: ${LINE_HEIGHTS.medium};
        font-weight: ${FONT_WEIGHTS.semiBold};
    `}

    ${props => props.variant === 'h6' && css`
        font-size: ${FONT_SIZES.micro}px;
        letter-spacing: 0.08em;
        line-height: ${LINE_HEIGHTS.medium};
        font-weight: ${FONT_WEIGHTS.normal};
        text-transform: uppercase;
    `}

    ${props => props.variant === 'bodyLarge' && css`
        font-size: ${FONT_SIZES.small}px;
        line-height: ${LINE_HEIGHTS.xlarge};
    `}

    ${props => props.variant === 'bodyMedium' && css`
        font-size: ${FONT_SIZES.xsmall}px;
        line-height: ${LINE_HEIGHTS.xlarge};
    `}

    ${props => props.variant === 'bodySmall' && css`
        font-size: ${FONT_SIZES.micro}px;
        line-height: ${LINE_HEIGHTS.large};
    `}

    ${props => props.variant === 'bodyMicro' && css`
        font-size: ${FONT_SIZES.nano}px;
        line-height: ${LINE_HEIGHTS.large};
    `}

    ${props => props.variant === 'button' && css`
        font-size: ${FONT_SIZES.micro}px;
        line-height: ${LINE_HEIGHTS.base};
    `}

    ${props => props.variant === 'link' && css`
        color: blue; 
        font-size: ${FONT_SIZES.xsmall}px;
        line-height: ${LINE_HEIGHTS.large};
    `}
`;

export const Typography = props => {
    const { component, children, ...rest } = props;
    return (
        <StyledTypography as={component} {...rest}>
            {children}
        </StyledTypography>
    );
};
