let selectedIcon = null;

export const LinkService = {

    getLandingNavLinks(): NavItem[] {
        return [
            {
                title: 'Events',
                slug: 'events'
            },
            // {
            //     title: 'About',
            //     slug: 'about'
            // },
            {
                title: 'Media',
                slug: 'media'
            },
            {
                title: 'Contact',
                slug: 'contact'
            },
            {
                title: 'Booking',
                slug: 'booking'
            },
            // {
            //     title: 'Sandbox',
            //     slug: '/sandbox'
            // },
            //    {     title: 'Flowbite 1',
            //         slug: '/flowbite'
            //     },
            //  {   title: 'Flowbite V2',
            //     slug: '/flowbite-v2'
            // }
        ]
    },

    getNavLinks(): NavItem[] {
        return [
           /* {
                title: 'Events',
                slug: '/events'
            },
            {
                title: 'About',
                slug: '/about'
            },
            {
                title: 'Media',
                slug: '/media'
            },
            {
                title: 'Contact',
                slug: '/contact'
            },
            {
                title: 'Sandbox',
                slug: '/sandbox'
            }*/

        ]
    },

    getSocialLinks(): SocialLink[] {
        return [
            {
                title: 'Tickets',
                slug: 'https://www.tickettailor.com/events/acquiredtastecomedy?ref=website',
                icon: 'pi-ticket'
            }
            , {
                title: 'Instagram',
                slug: 'https://instagram.com/acquiredtastecomedy',
                icon: 'pi-instagram'
            },
            {
                title: 'YouTube',
                slug: 'https://youtube.com/@acquiredtastecomedy',
                icon: 'pi-youtube'
            }, {
                title: 'Facebook',
                slug: 'https://facebook.com/acquiredtastecomedy',
                icon: 'pi-facebook'
            },
            {
                title: 'Email',
                slug: 'mailto:atc@acquiredtastecomedy.com',
                icon: 'pi-envelope'
            },
        ]
    },
};
