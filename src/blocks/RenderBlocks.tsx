import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { AboutStoryBlock } from '@/blocks/AboutStory/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContactPageBlock } from '@/blocks/ContactPage/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FAQSectionBlock } from '@/blocks/FAQSection/Component'
import { FeatureGridBlock } from '@/blocks/FeatureGrid/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HomepageHeroBlock } from '@/blocks/HomepageHero/Component'
import { ImageTextPanelBlock } from '@/blocks/ImageTextPanel/Component'
import { InquiryFormBlock } from '@/blocks/InquiryForm/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ProductRangeShowcaseBlock } from '@/blocks/ProductRangeShowcase/Component'
import { StoryVideoPanelBlock } from '@/blocks/StoryVideoPanel/Component'
import { TechnologyMaterialsBlock } from '@/blocks/TechnologyMaterials/Component'
import { TechnologyPanelBlock } from '@/blocks/TechnologyPanel/Component'
import { WhereToBuyBlock } from '@/blocks/WhereToBuy/Component'

const blockComponents = {
  aboutStory: AboutStoryBlock,
  archive: ArchiveBlock,
  contactPage: ContactPageBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  faqSection: FAQSectionBlock,
  featureGrid: FeatureGridBlock,
  formBlock: FormBlock,
  homepageHero: HomepageHeroBlock,
  imageTextPanel: ImageTextPanelBlock,
  inquiryForm: InquiryFormBlock,
  mediaBlock: MediaBlock,
  productRangeShowcase: ProductRangeShowcaseBlock,
  storyVideoPanel: StoryVideoPanelBlock,
  technologyMaterials: TechnologyMaterialsBlock,
  technologyPanel: TechnologyPanelBlock,
  whereToBuy: WhereToBuyBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
