import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type TechnologyArgs = {
  heroImage: Media
  materialImages: {
    stretchKnitCover: Media
    antiViralTreatment: Media
    supersoftPuFoam: Media
    dacronFresh: Media
    softechMiniPocket: Media
    cloudFeelFoam: Media
    gelMemoryFoam: Media
    fiveZonesLatex: Media
    encasedEdgeSupport: Media
    sevenZonePocket: Media
    firmFoam: Media
    balanceNet: Media
  }
}

export const technology: (args: TechnologyArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  materialImages,
}) => {
  return {
    slug: 'technology',
    _status: 'published',
    title: 'Technology',
    layout: [
      {
        blockType: 'technologyMaterials',
        heroImage: heroImage.id,
        heroTitle: 'Mattresses\nTechnology',
        heroSubtitle: 'Why choose Symbol Mattresses',
        introHeading: 'The Key to Comfort',
        introBody:
          'Every layer in a Symbol mattress is purposefully engineered using advanced sleep science. From responsive knit covers to zoned support systems, each material plays a precise role in delivering the restorative rest you deserve.',
        categories: [
          {
            title: 'QUILT LAYERS',
            materials: [
              {
                name: 'Stretch Knit Cover',
                eyebrow: 'Quilt Layer',
                title: 'Stretch Knit Cover',
                description:
                  'Engineered from high-quality knitted fabric, this cover features exceptional four-way stretchability that effortlessly conforms to your body contours and responds to the mattress layers beneath, delivering optimal pressure relief. Its unique micro-porous knit structure promotes continuous airflow and moisture-wicking, maintaining a fresh and breathable sleep microclimate throughout the night. Soft to the touch, it provides an instantly inviting feel for an elevated sleep experience.',
                image: materialImages.stretchKnitCover.id,
              },
              {
                name: 'Anti-Viral Treatment',
                eyebrow: 'Quilt Layer',
                title: 'Anti-Viral Treatment',
                description:
                  'Infused with cutting-edge protective technology, this advanced treatment creates an invisible shield on the fabric surface. It actively targets and significantly reduces viral and bacterial activity upon contact, preventing microbial growth and neutralizing odors at the source. Safe, eco-friendly, and non-irritating to the skin, it ensures a continuously hygienic sleep environment for ultimate peace of mind.',
                image: materialImages.antiViralTreatment.id,
              },
              {
                name: 'Supersoft Polyurethane Foam',
                eyebrow: 'Quilt Layer',
                title: 'Supersoft Polyurethane Foam',
                description:
                  'Serving as the ultimate comfort layer closest to the body, this supersoft foam features a delicate open-cell structure that delivers an instantly cloud-like, weightless feel. It expertly absorbs initial pressure upon contact, gently cradling high-pressure zones like the shoulders and hips to dissolve muscle tension. With exceptional resilience and plushness, it creates a seamless transition from the surface fabric\'s soft touch to the core support below, inviting your body into immediate, deep relaxation.',
                image: materialImages.supersoftPuFoam.id,
              },
              {
                name: 'Dacron® Fresh',
                eyebrow: 'Quilt Layer',
                title: 'Dacron® Fresh',
                description:
                  'Leveraging the renowned technology of Dacron®, this premium fiber is engineered to optimize your sleep microclimate. Dacron® Fresh features advanced moisture-management capabilities, acting as a network of micro-ventilation channels that rapidly capture and evaporate body moisture to maintain a dry, balanced sleep surface. By effectively inhibiting bacterial growth and odors caused by humidity, it delivers a long-lasting, self-refreshing barrier for a healthier and more revitalized night\'s rest.',
                image: materialImages.dacronFresh.id,
              },
            ],
          },
          {
            title: 'COMFORT LAYERS',
            materials: [
              {
                name: 'Softech Mini Pocket Spring system',
                eyebrow: 'Comfort Layer',
                title: 'Softech Mini Pocket Spring system',
                description:
                  'Engineered as a premium comfort-transition layer, the Softech® Mini Pocket Spring system redefines dynamic responsiveness with its high-density matrix. Thousands of miniature pocket springs act as responsive "micro-nodes," sensitive to the subtlest shifts in your body’s alignment to deliver precise, millimeter-level point-to-point pressure relief. Seamlessly bridging soft comfort and deep support, this system eliminates the rigidity of traditional coils. Each spring is individually pocketed to naturally absorb motion and eliminate friction, ensuring a silent, zero-disturbance sleep environment.',
                image: materialImages.softechMiniPocket.id,
              },
              {
                name: 'Premium Cloud-feel Foam',
                eyebrow: 'Comfort Layer',
                title: 'Premium Cloud-feel Foam',
                description:
                  'Engineered as the crown jewel of the mattress comfort layer, this Premium Cloud-feel Foam redefines the "zero-gravity" sleep experience through molecular-level resilience. It perfectly simulates the weightless sensation of floating on a cloud, gently cradling high-pressure zones like the shoulders, waist, and hips to achieve seamless, full-body contouring. Its advanced slow-resilience properties not only dissolve deep muscle tension but also absorb micro-vibrations, ensuring every movement is effortlessly cushioned for an elevated, luxurious night\'s rest.',
                image: materialImages.cloudFeelFoam.id,
              },
              {
                name: 'Gel Memory Foam',
                eyebrow: 'Comfort Layer',
                title: 'Gel Memory Foam',
                description:
                  'A perfect synergy of advanced temperature-regulation technology and aerospace-inspired pressure relief. By infusing premium memory foam with cooling gel particles, this material actively absorbs and dissipates excess body heat, breaking the heat-retention barrier of traditional foams to maintain a consistently fresh and cool sleep microclimate. Enhanced with its signature slow-resilience property, it fluidly contours to your body\'s unique shape, reducing localized pressure to near-zero for a perfectly cradled, sweat-free night\'s rest.',
                image: materialImages.gelMemoryFoam.id,
              },
              {
                name: '5 Zones Natural Latex',
                eyebrow: 'Comfort Layer',
                title: '5 Zones Natural Latex',
                description:
                  'Crafted from premium, sustainably sourced natural rubber, our 5-zone latex system is engineered to provide targeted, anatomical support. By varying the density across five distinct regions, it gently cradles the shoulders, provides firmer support for the lumbar area, and follows the natural curvature of the hips and legs. This isn\'t just about soft comfort; it’s an ergonomic alignment system. With its intrinsic honeycomb ventilation structure, it ensures exceptional breathability and naturally hypoallergenic protection for a cleaner, deeper, and more rejuvenating sleep.',
                image: materialImages.fiveZonesLatex.id,
              },
            ],
          },
          {
            title: 'SUPPORT LAYERS',
            materials: [
              {
                name: 'Encased Edge Support',
                eyebrow: 'Support Layer',
                title: 'Encased Edge Support',
                description:
                  'Engineered to eliminate perimeter sagging, this advanced edge support system integrates a high-density, high-rigidity reinforcement border around the entire mattress. By securing the physical boundaries, it prevents the rolling-off sensation and legalizes 100% of the sleep surface from corner to corner. Whether you are sleeping on the absolute edge or sitting on the side to put on shoes, it delivers unflinching, consistent support and enhances safety during daily sit-and-stand transitions.',
                image: materialImages.encasedEdgeSupport.id,
              },
              {
                name: '7-zone Pocket Spring System',
                eyebrow: 'Support Layer',
                title: '7-zone Pocket Spring System',
                description:
                  'Serving as the "intelligent skeletal framework" of the mattress, this 7-zone pocket spring system redefines precision support. By segments the sleeping surface into seven distinct anatomical zones—head, shoulders, back, waist, hips, thighs, and lower legs—we customized the coil gauge and pre-tension across each region to perfectly balance body weight distribution. It dynamically responds to every micro-shift in posture, allowing the shoulders and hips to sink gently for pressure relief, while delivering robust counter-pressure to align the lumbar spine. With each coil individually encased to absorb motion, it provides a quiet, tailor-made alignment system for undisturbed sleep.',
                image: materialImages.sevenZonePocket.id,
              },
              {
                name: 'Firm Foam',
                eyebrow: 'Support Layer',
                title: 'Firm Foam',
                description:
                  'Engineered for those who favor a structured feel and heavy-duty counter-pressure, this firm foam serves as a vital orthopedic protection layer. Utilizing high-density molecular compression, it delivers exceptional resistance to sagging, effectively distribution body weight to prevent spinal misalignment caused by excessive sinking. Acting as the structural cornerstone of the mattress, it seamlessly dampens bottom-layer spring feedback while providing a stabilizing foundation for upper comfort layers, balancing deep stability with unwavering skeletal support.',
                image: materialImages.firmFoam.id,
              },
              {
                name: 'Pressure Release Balance Net',
                eyebrow: 'Support Layer',
                title: 'Pressure Release Balance Net',
                description:
                  'Engineered as the structural matrix and load-dispatching core inside the mattress, this high-tenacity balance net features a specialized geometric grid designed for optimal pressure equalization. Upon receiving localized vertical body pressure, its interconnected network nodes instantaneously dissipate concentrated force horizontally, maintaining an exceptionally balanced sleep surface. Acting as a protective powerhouse between the spring core and comfort foam layers, it completely eliminates spring-on-foam friction. Furthermore, its open-grid layout serves as a built-in ventilation channel, promoting inner airflow and moisture-wicking for long-term mattress integrity.',
                image: materialImages.balanceNet.id,
              },
            ],
          },
        ],
      },
    ],
    meta: {
      description:
        'Explore the advanced materials and technologies behind Symbol Mattresses. From quilt layers to support systems, discover how every layer contributes to better sleep.',
      title: 'Technology | Symbol Mattresses',
    },
  }
}
