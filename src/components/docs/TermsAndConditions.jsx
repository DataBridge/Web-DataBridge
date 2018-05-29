import React from 'react';
import { Link } from 'react-router-dom';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import { Row, Col } from 'antd';

import Card from '../cards/Card'

const enhance = compose(
  withState('contactVisible', 'setContact', false),
);

const Terms = enhance(({ styles, ...props }) => {
  return (
    <div {...css(styles.container) }>
      <Row {...css(styles.Head) }>
        <p {...css(styles.HeadTitle) }>
          Terms and Conditions
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p>These Terms and Conditions, together with the Service Agreement, if applicable, and the Privacy Policy (collectively, "Agreement") govern your relationship with Vlynt. and its parents, subsidiaries, divisions, branches, and affiliates (collectively "Vlynt" or "Company") and set forth the terms and conditions under which Vlynt makes available the Services (as defined below), to each person or entity which is accessing or using the Services and/or its website or which is the signatory on the Service Agreement ("Customer").
        </p>
        <p>
        By browsing, accessing, using, registering for or otherwise using our services, you are agreeing to all of the following Terms and Conditions, including any policies referred to herein (collectively, these “Terms”). So, please read these Terms carefully. We reserve the right to change this Site and these Terms at any time. If you are unwilling to be bound by these Terms‚ you should not browse, access‚ use‚ register for or use services from the Site. As long as you do not cease using any of the Services, you will be conclusively deemed to have accepted these Terms.
        </p>
        <p>You represent and warrant that you are at least 18 years old or visiting this Site under the supervision of a parent or guardian.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Privacy Policy</p>
        <p>
          Our Privacy Policy, which also governs your visit to Our Site, can be found <Link to="/">here</Link>. Please review our Privacy Policy for information on how We collect, use and share information about our users.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Account</p>
        <p>
          In order to access some features of this Site‚ you may be required to register and We may assign to you, or you may be required to select, a password and user name or account identification. If you register‚ you agree to provide Us with accurate and complete registration information‚ and to inform us immediately of any updates or other changes to such information.
        </p>
        <p>
          You are solely responsible for protecting the security and confidentiality of the password and identification assigned to you. You shall immediately notify Us of any unauthorized use of your password or identification or any other breach or threatened breach of this Site's security. Each time you use a password or identification, you will be deemed to be authorized to access and use the Site in a manner consistent with these Terms, and We have no obligation to investigate the authorization or source of any such access or use of this Site. YOU WILL BE SOLELY RESPONSIBLE FOR ALL ACCESS TO AND USE OF THIS SITE BY ANYONE USING THE PASSWORD AND IDENTIFICATION ORIGINALLY SELECTED BY, OR ASSIGNED TO, YOU WHETHER OR NOT SUCH ACCESS TO AND USE OF THIS SITE IS ACTUALLY AUTHORIZED BY YOU, INCLUDING WITHOUT LIMITATION, ALL COMMUNICATIONS AND TRANSMISSIONS AND ALL OBLIGATIONS (INCLUDING WITHOUT LIMITATION FINANCIAL OBLIGATIONS) INCURRED THROUGH SUCH ACCESS OR USE.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Electronic Communication</p>
        <p>
          When you use this Site, or send emails to Us, you are communicating with Us electronically. You consent to receive communications from Us electronically. We will communicate with you by e-mail or by posting notices on this Site or through our other services. You agree that all agreements, notices, disclosures and other communication that We provide to you electronically satisfy any legal requirements that such communications be in writing.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Feedback</p>
        <p>
          Separate and apart from User Content, you may have the ability to submit questions, comments suggestions, reviews, ideas, plans, designs, notes, proposals, drawings, original or creative materials and other information regarding this Site, Us and our products or services (collectively "Feedback"). You agree that Feedback is non-confidential and shall become Our sole property. We shall own exclusive rights, including all intellectual property rights, in and to such Feedback and shall be entitled to the unrestricted use and dissemination of the Feedback for any purpose, commercial or otherwise, without acknowledgment or compensation to you.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Restrictions on Rights to Use</p>
        <p>
          You agree you shall not (and you agree not to allow any other individual or entity using your password and identification to):
          <ul>
            <li>download‚ modify‚ reproduce‚ adapt‚ translate‚ reverse engineer‚ create derivative works based upon‚ publicly display‚ sell‚ rent‚ license‚ or in any way commercially exploit any portion of this Site‚ except and to the extent expressly permitted under these Terms;</li>
            <li>remove any copyright‚ trademark or other proprietary rights notice contained in or on the Site;</li>
            <li>use any robot‚ spider‚ site search/retrieval application‚ or other device to retrieve or index any portion of this Site;</li>
            <li>collect any information about other users (including usernames and/or email addresses) for any purpose other than to solicit and/or share reviews with other users;</li>
            <li>reformat or frame any portion of any Web pages that are part of this Site;</li>
            <li>create user accounts by automated means or under false or fraudulent pretenses;</li>
            <li>create or transmit to other users unsolicited electronic communications‚ such as “spam‚” or otherwise interfere with other users’ enjoyment of the Site;</li>
            <li>submit to this Site any content that falsely states or implies that such content is sponsored or endorsed by us;</li>
            <li>transmit or upload to this Site any item containing or embodying any virus‚ worm‚ defect‚ malware‚ Trojan horse‚ software bomb or other feature designed to damage or degrade in any manner the performance of this Site‚ any other Web site‚ or any computer or other device or system‚ or the enjoyment of this Site by any user;</li>
            <li>use this Site to violate the security of or gain unauthorized access to any computer or computer network or other device or system (including unauthorized attempts to discover passwords or security encryption codes);</li>
            <li>submit to this Site any content that is unlawful or facilitates‚ constitutes‚ promotes or encourages illegal activity; or otherwise use the Site to transfer or store illegal material‚ including any material deemed threatening or obscene;</li>
            <li>copy or store any User Content offered on this Site other than for your personal‚ non-commercial use;</li>
            <li>take any action that imposes‚ or may impose‚ in our sole discretion‚ an unreasonable or disproportionately large data or traffic load on this Site or the IT infrastructure used to operate and make this Site available; or</li>
            <li>use this Site and/ or any User Content‚ intentionally or unintentionally‚ to violate any applicable local‚ state‚ federal or international law.</li>
          </ul>
          We have no obligation to monitor any user conduct on this Site, and We reserve the right and have absolute discretion to monitor any user conduct on this Site at any time and for any reason without notice.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Ownership</p>
        <p>
          As between you and Us‚ this Site‚ including all photographs‚ images‚ text‚ graphics‚ icons‚ audio clips‚ software‚ source code and other aspects thereof (excluding User Content)‚ all improvements or modifications thereof‚ all derivative works based thereon‚ and the collection‚ arrangement‚ and assembly of this Site (collectively, the “Site Content”)‚ including all copyrights‚ trademarks‚ and other intellectual property or proprietary rights in the foregoing‚ are owned by Us or our licensors and protected by applicable copyright laws.
        </p>
        <p>
          The use of any of Our trademarks or service marks without our express written consent is strictly prohibited. You may not use our trademarks or service marks in connection with any product or service in any way that is likely to cause confusion. You may not use our trademarks or service marks in any manner that disparages or discredits us. You may not use any of our trademarks or service marks in meta tags without prior explicit consent. Nothing in these Terms shall be deemed to grant to you or any other user any license or right in or to any of Our patents‚ copyrights‚ trademarks‚ trade secrets or other proprietary rights.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Purchases on this Site</p>
        <p>
          You agree that all of your transactions with or through this Site may, at Our option, be conducted electronically from start to finish. If We decide to proceed non-electronically, those transactions will still be governed by the remainder of these Terms unless you enter into different terms provided by us. You are responsible to print or make an electronic a copy of these Terms and any other contract or disclosure that we are required to provide to you.
        </p>
        <p>
          The risk of loss and title for items purchased by you on this Site pass to you upon our delivery of the items to the carrier pursuant to a shipment contract.
        </p>
        <p>
          We charge sales tax for merchandise ordered on this Site based on the applicable state sales tax rate of the location to which the order is being shipped.
        </p>
        <p>
          When We ship to you or per your directions to another person, you agree to pay the shipping and any handling charges shown on this Site when your order is placed. We reserve the right to increase, decrease and add or eliminate charges from time to time and without prior notice, so you agree to check all charges before placing an order or signing up for a service. Any shipping or handling charges may or may not reflect actual costs.
        </p>
        <p>
          Only valid credit cards or other payment method acceptable to us may be used. By submitting your order, you represent and warrant that you are authorized to use the designated card or method and authorize us to charge your order (including taxes, shipping, handling and any other amounts described on the Sites) to that card or other method. If the card (or other method) cannot be verified, is invalid, or is not otherwise acceptable, your order may be suspended or cancelled automatically.
        </p>
        <p>
          We attempt to be as accurate as possible and eliminate errors on this Site; however, We do not warrant that any product, service, description, photograph, pricing or other information is accurate, complete, reliable, current or error-free. In the event of an error, whether on this Site, in an order confirmation, in processing an order, delivering a product or service or otherwise, We reserve the right to correct such error and revise your order accordingly if necessary (including charging the correct price) or to cancel the order and refund any amount charged. Your sole remedy in the event of such error is to cancel your order and obtain a refund.
        </p>
        <p>
          All items are subject to availability and We reserve the right to impose quantity limits on any order, to reject all or part of an order and to discontinue products or services without notice, even if you have already placed your order. All prices are subject to change without notice.  We reserve the right to refuse or cancel any orders placed for products and/or services which the sale or use of such product and/or service in your state or jurisdiction is restricted or prohibited.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Links</p>
        <p>
          This Site may contain links to other sites on the Internet that are owned and operated by third parties. You acknowledge that We are not responsible for the operation of or content located on or through any such site.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Termination</p>
        <p>
          You may terminate the Terms at any time by closing your account, discontinuing your use of this Site and providing Us with a notice of termination. We reserve the right, without notice and in our sole discretion, to terminate your right to use this Site, or any portion of this Site, and to block or prevent your future access to and use of this Site or any portion of this Site.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Indemnification</p>
        <p>
          To the fullest extent permitted by applicable law, you agree to defend, indemnify and hold harmless Us and our subsidiaries and affiliates, and our respective officers, directors, agents, partners, members, employees, independent contractors, service providers and consultants ("Our Related Parties"), from and against any claims, damages, costs, liabilities and expenses (collectively, "Claims") arising out of or related to (a) your access to and use or misuse of this Site; (b) any User Content you post, upload, use, distribute, store or otherwise transmit on or through this Site; (c) any Feedback that you provide; (d) your violation of these Terms; and (e) your violation of any rights of another. You agree to promptly notify Us of any third party Claims, cooperate with Us in defending such Claims and pay all fees, costs and expenses associated with defending such Claims (including but not limited to attorneys' fees). You further agree that the We shall have the right to control of the defense or settlement of any third party Claims.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Disclaimers</p>
        <p>
          Except as expressly provided, this Site, including all Site Content, and services provided on or in connection with this Site are provided on an "AS IS" and "WITH ALL FAULTS" basis without representations, warranties or conditions of any kind, either express or implied. WE DISCLAIM ALL OTHER REPRESENTATIONS, WARRANTIES, CONDITIONS AND DUTIES, EXPRESS, IMPLIED OR STATUTORY, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES, DUTIES OR CONDITIONS: (A) OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR USE, RESULTS, TITLE, AND NON-INFRINGEMENT; AND (B) CREATED BY TRADE USAGE, COURSE OF DEALING OR COURSE OF PERFORMANCE. We do not represent or warrant that this Site is accurate, complete, reliable, current or error-free. We do not represent or warrant that this Site or our servers are free of viruses or other harmful components.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Exclusivity of Remedy; Limitation of Liability</p>
        <p>
          Your sole and exclusive remedy, and Our sole and exclusive liability, for any breach of warranty shall be your right to receive a refund for the service under Our applicable returns and exchanges policies. IN NO EVENT SHALL THE WE OR OUR RELATED PARTIES, BE LIABLE FOR SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS OR LOSS OF BUSINESS, EVEN IF THEY HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, NOR SHALL OUR AND OUR RELATED PARTIES’ AGGREGATE LIABILITY, WHETHER IN CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE, WHETHER ACTIVE, PASSIVE OR IMPUTED), OR OTHER THEORY, ARISING OUT OF OR RELATING TO THESE TERMS OR THE PURCHASE OR USE OF ANY PRODUCTS OR SERVICES PURCHASED THROUGH THIS SITE EXCEED THE PURCHASE PRICE OF THE PRODUCT OR SERVICE. THE LIMITATIONS SET FORTH IN THIS PARAGRAPH WILL NOT LIMIT OR EXCLUDE OUR OR OUR RELATED PARTIES’ GROSS NEGLIGENCE, FRAUD, INTENTIONAL, WILLFUL, MALICIOUS OR RECKLESS MISCONDUCT.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Remedies</p>
        <p>
          You agree that our remedy at law for any actual or threatened breach of these Terms would be inadequate and that we shall be entitled to specific performance or injunctive relief, or both, in addition to any damages that we may be legally entitled to recover, together with reasonable expenses of any form of dispute resolution, including, without limitation, attorneys' fees.
        </p>
        <p>
          No right or remedy of ours shall be exclusive of any other, whether at law or in equity, including without limitation damages injunctive relief, attorneys' fees and expenses.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Modifications to Site</p>
        <p>
          We reserve the right to modify or discontinue, temporarily or permanently, this Site or any features or portions thereof without prior notice.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Severability</p>
        <p>
          If any these provisions shall be deemed invalid, void, or for any reason unenforceable, that condition shall be deemed several and shall not affect the validity and enforceability of any remaining provision.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>No Third-Party Beneficiaries</p>
        <p>
          These Terms are for the benefit of, and will be enforceable by, the parties only. These Terms are not intended to confer any right or benefit on any third party or to create any obligations or liability of a party to any such third party.
        </p>
      </Row>

      <Row {...css(styles.cardRow)}>
        <p {...css(styles.TermsTitle)}>Miscellaneous</p>
        <p>
          No agency‚ partnership‚ joint venture‚ or employment relationship is created as a result of these Terms‚ and you do not have any authority of any kind to bind Us in any respect whatsoever. We may provide you with notices‚ including those regarding changes to these Terms‚ by email‚ regular mail‚ or postings on this Site. These Terms, which shall be deemed accepted by you upon your use of the Site‚ constitute the entire agreement among you and Us regarding use of this Site. Our failure to exercise or enforce any right or provision of these Terms shall not constitute a waiver of the enforcement of such right or provision. If any provision of these Terms is found to be unenforceable or invalid‚ that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect and enforceable. These Terms are not assignable‚ transferable or sublicensable by you‚ except with our prior written consent. These Terms include and incorporate by reference Our Privacy Policy, which can be found <Link to="/">here</Link>, and any notices regarding the Site.
        </p>
      </Row>

      <Row {...css(styles.subLine) }>
        <p {...css(styles.subLineBody) }>
          Questions regarding these Terms, Our Privacy Policy, or other policy related material can be directed to our support staff by emailing us at: contact.us@vlynt.com
        </p>
      </Row>
    </div>
  )
});

export default withStyles(({ color, unit }) => ({
  container: {
  },
  Head: {
    color: color.tabBlue,
    textAlign: 'center',
    paddingBottom: '30px',
    paddingTop: '25px',
  },
  HeadTitle: {
    fontSize: '48px',
  },
  cardRow: {
    margin: 'auto',
    width: '100%',
    maxWidth: '1200px',
  },
  TermsTitle: {
    marginTop: '20px',
    fontSize: '24px',
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
  link: {
    color: 'white',
    ':hover': {
      color: color.lightPrimary,
    }
  },
}))(Terms)
