import React from 'react';
import Image from 'next/image';

import makeStyles from '@mui/styles/makeStyles';
import { Element } from 'react-scroll';

// Components
import MarkdownWrapper from '../shared/MarkdownWrapper';
import ArticleTable from './ArticleTable';

// Utils
import { CONTENT_TYPE } from '../../utils/articleContentParser';
import STORES from '../../utils/getStores';

const ArticleContent = ({ content }) => {
  const classes = useStyles();

  const renderContent = (contentItem, index) => {
    const { contentType, text, data, blockFormatting } = contentItem;
    switch (contentType) {
      case CONTENT_TYPE.h1:
        return (
          <Element
            key={`${contentType}-${index}`}
            name={`${contentType}-${index}`}
          >
            <MarkdownWrapper styles={classes.heading} variant='h1'>
              {text}
            </MarkdownWrapper>
          </Element>
        );

      case CONTENT_TYPE.h2:
        return (
          <Element
            key={`${contentType}-${index}`}
            name={`${contentType}-${index}`}
          >
            <MarkdownWrapper styles={classes.heading} variant='h2'>
              {text}
            </MarkdownWrapper>
          </Element>
        );

      case CONTENT_TYPE.h3:
        return (
          <Element
            key={`${contentType}-${index}`}
            name={`${contentType}-${index}`}
          >
            <MarkdownWrapper styles={classes.heading} variant='h3'>
              {text}
            </MarkdownWrapper>
          </Element>
        );

      case CONTENT_TYPE.paragraph:
        return (
          <Element
            key={`${contentType}-${index}`}
            name={`${contentType}-${index}`}
          >
            <MarkdownWrapper styles={classes.para} variant='body1'>
              {text}
            </MarkdownWrapper>
          </Element>
        );

      case CONTENT_TYPE.image:
        return (
          <div
            className={classes.articleImgContainer}
            key={`div-${contentType}-${index}`}
          >
            <Image
              key={`${contentType}-${index}`}
              src={
                STORES[contentItem.media.store] +
                encodeURI(contentItem.media.storePath)
              }
              alt={text}
              layout='fill'
              className={classes.articleImg}
            />
          </div>
        );

      case CONTENT_TYPE.quote:
        return (
          <div key={`${contentType}-${index}`} className={classes.blockquote}>
            <MarkdownWrapper variant='body1' styles={classes.blockquoteData}>
              {text}
            </MarkdownWrapper>
          </div>
        );

      case CONTENT_TYPE.ol:
        return (
          <MarkdownWrapper key={`${contentType}-${index}`} variant='body1'>
            {text}
          </MarkdownWrapper>
        );

      case CONTENT_TYPE.ul:
        return (
          <MarkdownWrapper key={`${contentType}-${index}`} variant='body1'>
            {text}
          </MarkdownWrapper>
        );

      case CONTENT_TYPE.table:
        return <ArticleTable data={data} blockFormatting={blockFormatting} />;

      case CONTENT_TYPE.barGraph:
        return null;

      case CONTENT_TYPE.columnGraph:
        return null;

      case CONTENT_TYPE.lineChart:
        return null;

      case CONTENT_TYPE.pieChart:
        return null;

      case CONTENT_TYPE.horizontalLine:
        return <hr />;

      default:
        return null;
    }
  };

  return content.map(renderContent);
};

export default ArticleContent;

const useStyles = makeStyles((theme) => ({
  para: {
    marginTop: '1rem',
    marginBottom: '1rem',
    textAlign: 'justify',
    hyphens: 'auto',
    fontWeight: 'normal',
  },
  heading: {
    marginTop: '0.5rem',
  },
  articleImgContainer: {
    margin: '25px 0px',
    width: '100%',
    height: 'auto',
    '& > span': {
      position: 'unset !important',
    },
    '& > span > span': {
      display: 'none !important',
    },
  },
  articleImg: {
    position: 'unset !important',
    width: 'auto !important',
    height: 'auto !important',
  },
  blockquote: {
    paddingLeft: '4rem',
    fontStyle: 'italic',
    fontWeight: '400',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '2rem',
    },
  },
  blockquoteData: {
    paddingLeft: '1rem',
    borderLeft: '4px solid',
    borderColor: theme.palette.common.black,
    minHeight: '60px',
  },
}));
