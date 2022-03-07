import { isNavigationFailure } from 'vue-router';

import type { UserModule } from '~/types';

export const install: UserModule = ({ isClient, router, head }) => {
    if (isClient) {
        router.afterEach((to, _from, failure) => {
            if (!isNavigationFailure(failure)) {
                head?.addHeadObjs(
                    ref({
                        title: !to.name ? 'WarStars' : to.name !== 'WarStars' ? `${String(to.name)} - WarStars` : 'WarStars',
                        meta: [{ name: 'description', content: 'Complete package for  Clash of Clans tournament leagues. ' }]
                    })
                );
                if (typeof window !== 'undefined') head?.updateDOM();
            }
        });
    }
};
