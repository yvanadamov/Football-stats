Databases:

From mlab.com, tools option in database section(mongo must be installed):

-export database: 
mongodump -h ds139277.mlab.com:39277 -d football_stats_proto -u <user> -p <password> -o <output directory> 

-import database:
mongorestore -h ds139277.mlab.com:39277 -d football_stats_proto -u <user> -p <password> <input db directory> 

-export collection:
mongoexport -h ds139277.mlab.com:39277 -d football_stats_proto -c opr_coefficients -u <user> -p <password> -o opr_coefficients.csv --csv -f <comma-separated list of field names> 

#football-stats-proto

#TODO list:
-fill with data;
-move to loval/sharding(Ivan, Dido);
-indexes and optimization(Ivan, Dido) - when we start searching in Mongo;
-description - JSON shemas(Ivan in future);

#collections:

colName
description
relations
jsonShema