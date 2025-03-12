#include <stdio.h>
#include "awk_sem.h"

main()
{
    int i = 0;
    // *** please insert proper semaphore initialization here
    int semid = get_sem(".", 'B');
    printf("p2 smeid %d", semid);
    int semid_nxt = get_sem(".", 'C');
    do
    {
        // *** this is where you should place semaphore
        P(semid);
        printf("P222222222 is here\n");
        i++;

        // *** this is where you should place semaphore
        V(semid_nxt);
        V(semid_nxt);
    } while (i < 100);
}