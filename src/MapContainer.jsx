import React, { PureComponent } from "react";
import MapGl from "./MapGl";

class MapContainer extends PureComponent {
    render(){
        return (
          <div>
                <MapGl />
          </div>
        )
    }
}

export default MapContainer;
