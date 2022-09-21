export interface Respuesta {
    results: Result[];
    info:    Info;
}


export interface Result {
    Personas: Persona[];
    Status:boolean;
    Mensaje:string;
}


export interface Persona {
    Nombre:    string | null;
    Edad:      number | null;
    Sexo:      string | null;
    Documento: string | null;
}

export interface User {
    username:  string;
    tier:      string;
    results:   string;
    remaining: string;
}

export interface Time {
    instruct: number;
    generate: number;
}

export interface Info {
    seed:    string;
    results: string;
    page:    string;
    version: string;
    time:    Time;
    user:    User;
}
