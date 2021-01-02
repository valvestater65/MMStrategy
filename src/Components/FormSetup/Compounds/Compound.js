import React,{Component} from 'react';

class Compound extends Component {
    
    state = {
        tyreTypes: ["UltraSoft","SuperSoft","Soft","Medium","Hard","Inter","Full-Wet"],
        setCompound:{
            id : this.props.id,
            tyreType: "",
            maxLaps: 0,
            minLaps:0
        }
    }

    getTyreOptions = () => 
    {
        return this.state.tyreTypes.map(tyre => 
            {
                return <option key={tyre} value={tyre}>{tyre}</option>
            });
    }

    setMaxLapsHandler = (e) => 
    {
        e.preventDefault();
        let currentTyre = this.state.setCompound;
        currentTyre.maxLaps = e.target.value;
        this.setState({setCompound: currentTyre});
    }

    setMinLapsHandler = (e) =>{
        e.preventDefault();
        let currentTyre = this.state.setCompound;
        currentTyre.minLaps = e.target.value;
        this.setState({setCompound: currentTyre});
    }

    setTyreTypeHandler = (e) => {
        e.preventDefault();
        let currentTyre = this.state.setCompound;
        currentTyre.tyreType = e.target.value;
        this.setState({setCompound: currentTyre});
    }

    render () {
        return (
            <div>
                <select name="compounds" onChange={(event) => this.setTyreTypeHandler(event)}>
                    {this.getTyreOptions()}
                </select>
                <input type="text" placeholder="MaxLaps" onChange={(event) => this.setMaxLapsHandler(event)} /> 
                <input type="text" placeholder="MinLaps" onChange={(event) => this.setMinLapsHandler(event)}/> 
                <button onClick={() => this.props.setCompound(this.state.setCompound)}>Set</button>
                <button>Remove</button>
            </div>

        );
    }

}

export default Compound;