#include <stdio.h>
#include "awk_sem.h"

main()
{
    int i = 0;
    // *** please insert proper semaphore initialization here
    int semid = get_sem(".", 'C');
    int semid_nxt = get_sem(".", 'A');

    do
    {
        // *** this is where you should place semaphore
        P(semid);
        printf("P3333333 is here\n");
        i++;

        // *** this is where you should place semaphore
        V(semid_nxt);
    } while (i < 200);
}