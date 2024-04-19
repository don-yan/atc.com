export {gsap} from 'gsap';
export {ScrollTrigger} from 'gsap/ScrollTrigger';

export const scrollToId = (id: string) => {

    console.log('scrollToId', id)

    if(id.startsWith('#')) id = id.substring(1)

    document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: "nearest"
    });

}