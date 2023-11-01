export default function Rounded() {
    return(
<svg id="rotatingText" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <path id="circle" d="M 100, 100 m -75, 0 a 75, 75 0 1, 0 150, 0 a 75, 75 0 1, 0 -150, 0">
    </path>
  </defs>
  <text className=" text-white" width="400">
    <textPath alignmentBaseline="central" xlinkHref="#circle" className="text fixed tracking-widest font-mono font-light ">
      . FOR ME GOD IS ALSO A . DESIGNER
    </textPath>
    
  </text>
</svg>

    )
}