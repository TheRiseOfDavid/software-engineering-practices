TARGETS = p1 p2 p3 

all: $(TARGETS)
	./p1 & ./p2 & ./p3&

p1: p1.c
	gcc -o p1 p1.c sem.c

p2: p2.c  
	gcc -o p2 p2.c sem.c

p3: p3.c
	gcc -o p3 p3.c sem.c

clean:
	rm -f $(TARGETS)