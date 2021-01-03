class RaceStrategy{

    Stints = [];
    WeightFactor = 1;
    
    strategyWeight = () => 
    {

        let totalWeight = 0;
        this.Stints.forEach((stint) => 
        {
            totalWeight += stint.weight;
        })

        return totalWeight * this.WeightFactor;
    }
}

export default RaceStrategy;