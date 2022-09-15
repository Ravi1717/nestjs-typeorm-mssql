import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide:'DATA_SOURCE',
        useFactory: async ()=>{
            const dataSource = new DataSource({
                type:'mssql',
                //when running the app without docker change hostname to <<localhost>>
                host:'db',
                port:1433,
                username:'sa',
                password:'Matrix@2022',
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