import { Svg, Rect, Circle } from '@react-pdf/renderer';

export const Square = ({ style }) => (
    <Svg viewBox='0 0 10 10' width='6.5' height='6.5' style={style}>
        <Rect 
            x='1'
            y='1'
            width='6.5'
            height='6.5'
            fill='black'
        />
    </Svg>
)

export const CirclePoint = ({ style }) => (
    <Svg viewBox='0 0 10 10' width='5' height='5' style={style}>
        <Circle 
            cx='5'
            cy='5'
            r='5'
            fill='black'
        />
    </Svg>
)

export const Triangle = ({ style }) => (
    <Svg viewBox='0 0 10 10' width='6.5' height='6.5' style={style}>
        <Rect 
            x='1'
            y='1'
            width='6.5'
            height='6.5'
            fill='black'
        />
    </Svg>
)

export const Diamond = ({ style }) => (
    <Svg viewBox='0 0 10 10' width='6.5' height='6.5' style={style}>
        <Rect 
            x='1'
            y='1'
            width='6.5'
            height='6.5'
            fill='black'
        />
    </Svg>
)