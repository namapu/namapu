import Immutable from 'immutable';

export type TCard = {
    name: string;
    id: string;
}

export type TConn = {
    name: string;
    id: string;
}

export type TFrame = {
    name: string;
    id:string;
}

export type TState = {
    cards: Array<TCard>;
    conns: Array<TConn>;
    frames: Array<TFrame>
}

export type THistory = {
    states: Immutable.List<TState>[];
    index: number;
}

export type UiState = {

}

export type TAppState = {
    history: THistory;
    uiState: UiState;
}
