#include <stdio.h>
#include <unistd.h>
#include "awk_sem.h"

main()
{
    // *** Please insert proper semaphore initialization here
    int semid = create_sem(".", 'A', 2);
    int semid_nxt = create_sem(".", 'B', 0);
    int semid_nxt2 = create_sem(".", 'C', 0);
    int i = 0;

    do
    {
        // *** this is where you should place semaphore
        P(semid);
        P(semid);
        printf("P1111111111 is here\n");
        i++;

        // *** this is where you should place semaphore
        V(semid_nxt);
    } while (i < 100);

    destroy_sem(semid);
    destroy_sem(semid_nxt);
    destroy_sem(semid_nxt2);
}