import React from 'react';

//stateeless functional component with implicit return
//as not a class, "this" cannot be used, therefore "props" must be passed as argument
const Header = (props) => (
  <header className="top">
    <h1>Catch 
      <span className="ofThe">
        <span className="of">Of</span>
        <span className="the">The</span>
      </span> 
      Day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
)

//regular component.
// class Header extends React.Component {

//   render() {
//     return (
//       <header className="top">
//         <h1>Catch 
//           <span className="ofThe">
//             <span className="of">Of</span>
//             <span className="the">The</span>
//           </span> 
//           Day
//         </h1>
//         <h3 className="tagline">
//           <span>{this.props.tagline}</span>
//         </h3>
//       </header>
//     )
//   }
// }

export default Header;