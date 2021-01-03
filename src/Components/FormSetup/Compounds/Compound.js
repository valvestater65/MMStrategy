import React,{Component} from 'react';
import TyreType from '../../../Models/TyreType';

class Compound extends Component {
    
    tyreNames = ['Ultra-Soft','Super-Soft','Soft','Medium','Hard','Inter','Full-Wet'];

    state = {
        tyreTypes:[],
        setCompound:{
            id : this.props.id,
            tyreType: "",
            maxLaps: 0,
            minLaps:0,
            available:0
        },
        isSet:false
    }

    constructor(props)
    {
        super(props);
        this.state.tyreTypes  =this.initializeTyreTypes();
    }



    initializeTyreTypes = () => 
    {
        let returnTyres = [];
        for(let i=0;i<this.tyreNames.length;i++)
        {
            returnTyres.push(
                new TyreType(this.tyreNames[i],i)
            );
        }
        return returnTyres;
    }

    getTyreOptions = () => 
    {
        return this.state.tyreTypes.map(tyre => 
            {
                return <option key={tyre.name} value={tyre.name}>{tyre.name}</option>
            });
    }

    setMaxLapsHandler = (e) => 
    {
        e.preventDefault();
        let currentTyre = this.state.setCompound;
        currentTyre.maxLaps = parseInt(e.target.value);
        this.setState({setCompound: currentTyre});
        this.setState({isSet:true});
    }

    setMinLapsHandler = (e) =>{
        e.preventDefault();
        let currentTyre = this.state.setCompound;
        currentTyre.minLaps = parseInt(e.target.value);
        this.setState({setCompound: currentTyre});
        this.setState({isSet:true});
    }

    setTyreTypeHandler = (e) => {
        e.preventDefault();
        let currentTyre = this.state.setCompound;
        currentTyre.tyreType = this.state.tyreTypes.find((el) => {return el.name === e.target.value});
        this.setState({setCompound: currentTyre});
        this.setState({isSet:true});
    }

    setAvailableCompoundsHandler = (e) => 
    {
        e.preventDefault();
        let currentTyre = this.state.setCompound;
        currentTyre.available = parseInt(e.target.value);
        this.setState({setCompound: currentTyre});
        this.setState({isSet:true});
    }

    render () {
        return (
            <div>
                <select name="compounds" onChange={(event) => this.setTyreTypeHandler(event)}>
                    {this.getTyreOptions()}
                </select>
                <label>Max Laps:</label>
                <input type="text" placeholder="MaxLaps" onChange={(event) => this.setMaxLapsHandler(event)} /> 
                <label>Min Laps:</label>
                <input type="text" placeholder="MinLaps" onChange={(event) => this.setMinLapsHandler(event)}/> 
                <label>Available:</label>
                <input type="text" placeholder="Available" onChange={(event) => this.setAvailableCompoundsHandler(event)}/>
                {
                (this.state.isSet)?
                    <button onClick={() => {
                        this.setState({isSet:false})
                        this.props.setCompound(this.state.setCompound);}}
                        >Set</button>
                        :
                        <button disabled>Set</button>
                
                }
                <button>Remove</button>
            </div>

        );
    }

}

export default Compound;