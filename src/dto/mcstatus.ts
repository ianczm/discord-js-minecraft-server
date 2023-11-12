export namespace MCStatus {
  export type Player = {
    uuid: string;
    name_raw: string;
    name_clean: string;
    name_html: string;
  };

  export type Mods = {
    name: string;
    version: string;
  };

  export type Plugins = {
    name: string;
    version: string | null;
  };

  export type Response = {
    online: boolean;
    host: string;
    port: number;
    ip_address: string | null;
    eula_blocked: boolean;
    retrieved_at: bigint;
    expires_at: bigint;
    version: {
      name_raw: string;
      name_clean: string;
      name_html: string;
      protocol: number;
    } | null;
    players: {
      online: number;
      max: number;
      list: Player[];
    };
    motd: {
      raw: string;
      clean: string;
      html: string;
    } | null;
    icon: string | null;
    mods: Mods[];
    software: string | null;
    plugins: Plugins[];
    srv_record: {
      host: string;
      port: number;
    } | null;
  };
}
