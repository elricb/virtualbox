import React from 'react';
import classnames from 'classnames';
import get from 'lodash/get';

import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';
import renderModules from 'app/lib/module-renderer';
import RelatedContent from 'app/components/related-content';

const PageCaseStudy = React.createClass({
  mixins: [getScrollTrackerMixin('case-study')],
  render() {
    const { caseStudy } = this.props;
    const classes = classnames('page-case-study', this.props.className);
    return <article className={classes}>
      <style>{`
        .page-case-study a {
          border-bottom-color: ${get(caseStudy, 'colors.secondary')};
        }
      `}</style>
      {renderModules({
        modules: get(caseStudy, 'page_builder', []),
        colours: get(caseStudy, 'colors'),
        zebra: true
      })}
      {this.renderRelatedContent()}
    </article>;
  },
  renderRelatedContent() {
    let relatedContent;
    if(this.props.relatedContent.length) {
      relatedContent = <RelatedContent content={this.props.relatedContent} />
    }
    return relatedContent;
  }
});

export default PageCaseStudy;
