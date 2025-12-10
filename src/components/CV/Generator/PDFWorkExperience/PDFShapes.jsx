import { Svg, Rect, Polygon, Circle as CircleSVG } from '@react-pdf/renderer';

export default function BulletIcon ({ type, style, fill, stroke }) {
    const bulletComponents = {
        square: Square,
        circle: Circle,
        triangle: Triangle,
        diamond: Diamond
    }

    const Component = bulletComponents[type];
    return <Component style={style} fill={fill} stroke={stroke} />
}

const Square = ({ style, size = 6.5, fill = 'black', stroke = null }) => (
    <Svg viewBox='0 0 10 10' width={size} height={size} style={{ marginTop: 5, ...style }}>
        <Rect 
            x='1'
            y='1'
            width='6.5'
            height='6.5'
            fill={fill}
            stroke={stroke}
        />
    </Svg>
)

const Circle = ({ style, size = 6, fill = 'black', stroke = null }) => (
    <Svg viewBox='-1 -1 12 12' width={size} height={size} style={{ marginRight: 1.5, marginTop: 5.4, ...style }}>
        <CircleSVG 
            cx='5'
            cy='5'
            r='5'
            fill={fill}
            stroke={stroke}
        />
    </Svg>
)

// Adding extra margin to outlined triangle to align the icon properly 
const SOLID_TRIANGLE_MARGIN_TOP = 4;
const OUTLINED_TRIANGLE_MARGIN_TOP = 5;

const Triangle = ({ style, size = 7.5, fill = 'black', stroke = null }) => (
    <Svg viewBox="0 0 10 10" width={size} height={size} style={{ marginLeft: -1, marginRight: .1, marginTop: stroke ? OUTLINED_TRIANGLE_MARGIN_TOP : SOLID_TRIANGLE_MARGIN_TOP, ...style }}>
        <Polygon 
            points="5,1 9,9 1,9" 
            fill={fill} 
            stroke={stroke} 
        />
  </Svg>
)

// Adding extra margin to outlined triangle to align the icon properly 
const SOLID_DIAMOND_MARGIN_TOP = 4;
const OUTLINED_DIAMOND_MARGIN_TOP = 5;

const Diamond = ({ style, size = 7.5, fill = 'black', stroke = null }) => (
    <Svg width={size} height={size} viewBox="0 0 10 10" style={{ marginLeft: -1, marginTop: stroke ? OUTLINED_DIAMOND_MARGIN_TOP : SOLID_DIAMOND_MARGIN_TOP, ...style }}>
        <Polygon 
            points="5,1 9,5 5,9 1,5" 
            fill={fill} 
            stroke={stroke} 
        />
  </Svg>
)