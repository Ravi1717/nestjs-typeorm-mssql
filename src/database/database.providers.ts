import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide:'DATA_SOURCE',
        useFactory: async ()=>{
            const dataSource = new DataSource({
                type:'mssql',
                host:'db',
                port:1433,
                username:'***',
                password:'***',
                //database:'bookstore',
                //autoLoadEntities: true,
                synchronize: true,
                options: { encrypt: false },
                entities:[
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                //synchronize: true,
            });
            return dataSource.initialize();
        }
    }
]