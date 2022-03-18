import { IDisplayableStat } from "../marshalling/StatsModel";

export interface IStatComponentMap {
    [key: string]: React.Component<IStatsControllerProps>
}

export interface IStatsControllerProps {
    activeStat: string
    stat: IDisplayableStat
}
