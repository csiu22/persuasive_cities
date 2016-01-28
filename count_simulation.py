import psycopg2
from random              import randint
from threading import Thread, Event

NORTH_TABLE_INSERT_QUERY_STATEMENT = """INSERT INTO bicycle_table (time, neighborhood, city) values ('1/1/16 12:00', 'North End', 'Boston');"""
SOUTH_TABLE_INSERT_QUERY_STATEMENT = """INSERT INTO bicycle_table (time, neighborhood, city) values ('1/1/16 12:00', 'South End', 'Boston');"""
BACK_TABLE_INSERT_QUERY_STATEMENT = """INSERT INTO bicycle_table (time, neighborhood, city) values ('1/1/16 12:00', 'Back Bay', 'Boston');"""
SOMER_TABLE_INSERT_QUERY_STATEMENT = """INSERT INTO bicycle_table (time, neighborhood, city) values ('1/1/16 12:00', 'Somerville', 'Cambridge');"""
EAST_TABLE_INSERT_QUERY_STATEMENT = """INSERT INTO bicycle_table (time, neighborhood, city) values ('1/1/16 12:00', 'East Cambridge', 'Cambridge');"""


class MyThread(Thread):
    def __init__(self, event):
        Thread.__init__(self)
        self.stopped = event

    def run(self):
        rand = randint(1,5)
        while not self.stopped.wait(rand):
            cursor = connection.cursor()
            if rand == 1:
              cursor.execute(NORTH_TABLE_INSERT_QUERY_STATEMENT)
            if rand == 2:
              cursor.execute(SOMER_TABLE_INSERT_QUERY_STATEMENT)
            if rand == 3:
              cursor.execute(EAST_TABLE_INSERT_QUERY_STATEMENT)
            if rand == 4:
              cursor.execute(SOUTH_TABLE_INSERT_QUERY_STATEMENT)
            if rand == 5:
              cursor.execute(BACK_TABLE_INSERT_QUERY_STATEMENT)
            connection.commit()
            rand = randint(1,5)

def connect_to_database(dsn="postgres://localhost:5432/bicycle"):
  try:
    return psycopg2.connect(dsn)
  except:
    print "Unable to connect to database"

def run():
  stopFlag = Event()
  thread = MyThread(stopFlag)
  thread.start()
  # # this will stop the timer
  # stopFlag.set()



connection = connect_to_database()
run()