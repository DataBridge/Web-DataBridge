import React from 'react';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import { Row, Col } from 'antd';

import Card from '../cards/Card'

const enhance = compose(
  withState('contactVisible', 'setContact', false),
);

const Faq = enhance(({ styles, ...props }) => {
  return (
    <div {...css(styles.container) }>
      <Row {...css(styles.cardRow)}>
        <Card
          title="How does Vlynt work?"
          body={`Vlynt addresses the major flaws of server solutions (such as
            CDNs) by introducing a new technical protocol for web acceleration.
             Vlynt transforms the website’s users into transient servers. These
             distribute the data they have already downloaded for their
             personal use to the next user via peer-to-peer. The data is thus
             hypothetically served only once by the original server and is
             then continuously shared among the website’s users.`}
          styles={styles}
        />
        <Card
          title="How can Vlynt be faster than my current delivery model?"
          body={`With Vlynt, your data is right where your users are.
            This reduces the distance your data has to travel before arriving
            to a connecting user and can thus be faster than servers or CDNs.`}
          styles={styles}
        />
        <Card
          title="How can Vlynt help me save money?"
          body={`CDNs charge for transmitting data through their servers. By
            delivering the data through Vlynt, your CDN and/or servers are
            bypassed, avoiding the associated costs.`}
          styles={styles}
        />
        <Card
          title="How does Vlynt help me scale?"
          body={`The backbone of the Vlynt network are the users that visit
            the website. Therefore, an increase in traffic translates into an
            increase in performance. This results into a system with an almost
            infinite scalability and with great flexibility. Vlynt is
            available all over the world and thus automatically responds to
            any growth or geographic expansion of your user base.`}
          styles={styles}
        />
        <Card
          title="How can I use Vlynt?"
          body={`Simply register your web service on our website and add
             the Vlynt adapter to your website’s root.
             This will allow your website to communicate through the Vlynt
             network. This adaptor has to be called at the top of the body on
             all pages where Vlynt should be used.`}
          styles={styles}
        />
        <Card
          title="What are Vlynt’s requirements?"
          body={`In order to guarantee maximal security for the website and its
             users, the website needs to be served over HTTPS to be able to
              use Vlynt.`}
          styles={styles}
        />
        <Card
          title="Can I use a CDN and Vlynt at the same time?"
          body={`Yes. Whatever your current delivery model might be, Vlynt can
            be simply added on top, without having to modify anything else.
            If data is delivered through Vlynt, it will not be charged for by
            your CDN provider as it bypasses their servers.`}
          styles={styles}
        />
        <Card
          title="Do my users have to install anything to be able to use Vlynt?"
          body={`No. Vlynt relies on technologies that are available on every
             modern browser and requires no elevated privileges.`}
          styles={styles}
        />
        <Card
          title="How much benefit will I see from Vlynt?"
          body={`The gain in user experience, as well as the cost-reduction,
            depend on the number of peers, their interconnectivity and other
            factors. Nevertheless, Vlynt is based on a highly efficient
            protocol and in many cases we can reduce costs by roughly 50% and
            avoid server overload.`}
          styles={styles}
        />
        <Card
          title="Can Vlynt ever deteriorate user experience?"
          body={`No. Vlynt’s primary goal is to guarantee optimal website
            performance. If data cannot be fetched from a peer in a timely
            manner, Vlynt will fallback on the server.`}
          styles={styles}
        />
        <Card
          title="On what platforms will my users be able to access my service through Vlynt?"
          body={`As long as your web service is accessed through a modern
            browser, it can be accelerated through Vlynt. Be it from a
            smartphone, a desktop computer or even a TV.`}
          styles={styles}
        />
        <Card
          title="What browser are supported?"
          body={`Chrome, Firefox, Safari, Edge and Samsung Internet, meaning
            over 80% of currently used browsers. If a user accesses your
            service through a browser that is not supported, he will simply
            be directed to your existing delivery model.`}
          styles={styles}
        />
        <Card
          title="What content is supported?"
          body={`Per default, all non-streamed static content is supported.
            This can be fine-tuned in the ‘Patterns’ section of your Admin
            Panel.`}
          styles={styles}
        />
        <Card
          title="Does Vlynt work in all situations?"
          body={`The Vlynt Network is always online and has several fallback
            mechanisms. As long as more than one user is connected to your
            web service, Vlynt can accelerate your content.`}
          styles={styles}
        />
        <Card
          title="What happens if there is no peer available?"
          body={`Vlynt looks for the fastest route for every user. If no peer
             is available, or if the closest peer is not fast enough, the user
              will be directed to your pre-existing delivery model. `}
          styles={styles}
        />
        <Card
          title="How safe is Vlynt?"
          body={`Vlynt uses the latest protocols to ensure maximal security.
             All data transmitted over the network is secured using the SCTP
             and TLS protocols and files. Packets are verified via a unique
             signature to avoid corruption or modification. Vlynt does not
             transfer or modify user-specific data (tokens, keys, cookies,
               etc.).`}
          styles={styles}
        />
        <Card
          title="Can I configure how my data is delivered?"
          body={`Yes. What content is delivered, its time-to-live, the balance
            between Vlynt and your pre-existing delivery model and many other
            options can be configured in your Admin Panel. If you can not find
            the option you wish to modify, feel free to contact us.`}
          styles={styles}
        />
        <Card
          title="How does Vlynt work on metered connections?"
          body={`You can choose to allow or disallow the transfer of data over
             Vlynt when your users are on metered connections.`}
          styles={styles}
        />
        <Card
          title="Are there any legal issues about peer-to-peer?"
          body={`Peer-to-peer is perfectly legal and the technology is used by
             many well-trusted services such as Google Hangouts or
             Facebook Messenger.`}
          styles={styles}
        />
        <Card
          title="Can Vlynt be used to transfer data on internal networks?"
          body={`This is possible. Please reach out to us, so we can figure out
            what solution will fit best for you.`}
          styles={styles}
        />
        <Card
          title="Is Vlynt cleaner than other delivery models?"
          body={`As the website’s content is shared between the devices of its
             users, only the strict minimum of servers need to be supplied with
              energy and cooled. The CO2 emissions and the associated ecologic
              impact of network communications are brought to their lowest
              possible levels.`}
          styles={styles}
        />
        <Card
          title="How is peer-to-peer implemented in the browser?"
          body={`Vlynt relies on the WebRTC protocol supported by Google and
            Mozilla and standardized by the World Wide Web Consortium (W3C).
            It enables browsers, mobile platforms, and IoT devices to use
            real-time communication via a common set of protocols. It is most
            commonly used for peer-to-peer video chat and voice call
            applications.`}
          styles={styles}
        />
      </Row>

      <Row {...css(styles.subLine) }>
        <p {...css(styles.subLineBody) }>
          If you have any further question, please do not hesitate to contact us.
        </p>
      </Row>
    </div>
  )
});

export default withStyles(({ color, unit }) => ({
  container: {
  },
  cardRow: {
    margin: 'auto',
    width: '100%',
    maxWidth: '1200px',
  },
  subLine: {
    color: color.tabBlue,
    textAlign: 'center',
    marginTop: '120px',
    paddingBottom: '50px',
  },
  subLineBody: {
    fontSize: '24px',
    fontWeight: '400'
  },
}))(Faq)
