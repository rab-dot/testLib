import { createIcon } from '@chakra-ui/react'

export const AnimateLoader = createIcon({
  viewBox: '0 0 100 100',
  defaultProps: {
    preserveAspectRatio: 'xMidYMid',
    margin: 'auto',

    display: 'block',
    shapeRendering: 'auto',
    width: '200px',
    height: '200px',
  },
  path: (
    <>
      <circle cx="84" cy="50" r="10" fill="#420457">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="0.25s"
          calcMode="spline"
          keyTimes="0;1"
          values="10;0"
          keySplines="0 0.5 0.5 1"
          begin="0s"
        />
        <animate
          attributeName="fill"
          repeatCount="indefinite"
          dur="1s"
          calcMode="discrete"
          keyTimes="0;0.25;0.5;0.75;1"
          values="#420457;#b0d6f9;#708adc;#5a3faa;#420457"
          begin="0s"
        />
      </circle>
      <circle cx="16" cy="50" r="10" fill="#420457">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        />
      </circle>
      <circle cx="50" cy="50" r="10" fill="#5a3faa">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.25s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.25s"
        />
      </circle>
      <circle cx="84" cy="50" r="10" fill="#708adc">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.5s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.5s"
        />
      </circle>
      <circle cx="16" cy="50" r="10" fill="#b0d6f9">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.75s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.75s"
        />
      </circle>
    </>
  ),
})
