--------------------------------------------------------
--  DDL for Trigger COUNT_ENGINEER
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "JAY"."COUNT_ENGINEER" 
after insert on engineer
for each row
  begin
    update COUNTER 
    set TABLECOUNT = TABLECOUNT+1
    where TABLENAME = 'ENGINEER';
  end;
/
ALTER TRIGGER "JAY"."COUNT_ENGINEER" ENABLE;
