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

export type TMindmap = {
    cards: Array<TCard>;
    conns: Array<TConn>;
    frames: Array<TFrame>
}

export type THistory = {
    mindmaps: Immutable.List<TMindmap>[];
    index: number;
}
