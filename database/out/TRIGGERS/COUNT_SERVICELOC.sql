--------------------------------------------------------
--  DDL for Trigger COUNT_SERVICELOC
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "JAY"."COUNT_SERVICELOC" 
after insert on service_loc
for each row
  begin
    update COUNTER 
    set TABLECOUNT = TABLECOUNT+1
    where TABLENAME = 'SERVICE_LOC';
  end;
/
ALTER TRIGGER "JAY"."COUNT_SERVICELOC" ENABLE;
