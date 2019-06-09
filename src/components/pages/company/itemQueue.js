import React from 'react';
import { fire } from '../../../config/FirebaseConfig';


class ItemQueue extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editMode:false
        }
        
    }
    render(){
        return(
            <tr>
                <th>{this.state.idQueue[index]}</th>
                <th>{this.state.title[index]}</th>
                <th>{this.state.description[index]}</th>
                <th>{this.state.idOperator[index]}</th>
                <th>{this.state.numWait[index]}</th>
                <th> {
                    this.state.active[index] ? <IoIosCheckmark size={30} /> : <IoIosClose size={30} />
                    }
                </th>
            </tr>
        )
    }
}
export default ItemQueue