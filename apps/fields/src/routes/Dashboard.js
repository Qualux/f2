import { useContext } from 'react';
import { DomainContext } from '../contexts';
import AppTemplate from '../components/global/AppTemplate';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
const SelectField = () => {
    return(
        <Select options={options} value={{ value: 'vanilla', label: 'Vanilla' }} />
    );    
};

export default function Dashboard() {

    const domain = useContext(DomainContext);

    return(
        <AppTemplate title="Dashboard">
            
            <div className="grow max-w-3xl">
                <SelectField
                    isSearchable={true}
                />
                <section className="text-zinc-800">
                    <h2 className="font-bold text-4xl mb-5">
                        Thanks for trying out the F2 plugin for WordPress.
                    </h2>
                    <p className="my-5">
                        Our goal is to deliver the most modern approach to field management for the WordPress CMS.
                    </p>
                    <div>
                        <h3 className="font-bold text-2xl mb-4">
                            F2 Versus ACF Comparison
                        </h3>
                        <h4>
                            As long-time WordPress developers we love ACF and what it has done for over a decade in the WordPress ecosystem. It deserves to be recognized as the leading fields system for WP, and likely will retain that position for many years to come. However, F2 is working hard to catch-up and we are only about 15-years behind. Wish us luck. 
                        </h4>
                        <section className="grid grid-cols-4 gap-6 items-center">
                            <div>Field Types</div>
                            <div>7</div>
                            <div>28</div>
                            <div className="text-sm text-zinc-400">
                                Some of the ACF field types are for layout and we do not plan to use the same approach, opting to keep separation between "actual fields" and layout/rendering tools. We are aiming for "effective parity" (approximately 24 field types) by end of 2024.
                            </div>
                            <div>Storage Options</div>
                            <div>2 (Post Meta and Options)</div>
                            <div>4 (Post Meta, Options, User Meta, Term Meta)</div>
                            <div className="text-sm text-zinc-400">
                                We are 50% of the way to parity with 3 months as the estimate for delivery of User Meta and Term Meta support. Beyond this we plan to have core support for custom database table storage which ACF has available only through paid extensions.
                            </div>
                            <div>Repeating Fields</div>
                            <div>No</div>
                            <div>Yes (Pro License Only)</div>
                            <div className="text-sm text-zinc-400">
                                This is a major gap in F2 functionality currently. The good news is that we plan to release repeating fields support as a free feature in the Standard License (Free) version of F2 core. ACF provides repeating field support only in pro.
                            </div>
                            <div>Advanced Validation</div>
                            <div>Yes</div>
                            <div>No</div>
                            <div className="text-sm text-zinc-400">
                                ACF has limited validation controls such as required fields. F2 uses the robust RHF (React Hook Form) validation library and has developed a UI enabling users of F2 to determine which additional validators to add to fields and field groups.
                            </div>
                            <div>Registration of WP Assets</div>
                            <div>No</div>
                            <div>Yes (Pro License Only)</div>
                            <div className="text-sm text-zinc-400">
                                ACF Pro has the capability to register options pages (WP Admin pages), custom post types and custom taxonomies. F2 currently has no support in this category. Limited post type registration is planned as part of an F2 feature called "Structured Data Models", but it will not enable all CPT options the way that ACF Pro does. Instead the focus will be more on the support for establishing field storage by registering a standardized CPT with limited customization options.
                            </div>
                            <div>React Integration</div>
                            <div>Yes</div>
                            <div>No</div>
                            <div className="text-sm text-zinc-400">
                                F2 uses React in 2 ways. In the WP admin we provide the field management UI as an embedded React application. Everywhere that fields and forms are rendered, they are rendered in React and managed with RHF (React Hook Form). ACF in constrast utilizes a mixture of PHP, HTML templates, jQuery and vanilla JS to render and process fields and forms. The use of React is a significant advantage for F2 and will enable us to build more sophisticated field types as well as provide a better end-user experience. In fairness it will not be easy to outpace ACF on the admin side where the plugin has always had a reputation for being very user-friendly and easy to learn.
                            </div>
                            <div>Low Cost</div>
                            <div>Yes</div>
                            <div>No</div>
                            <div className="text-sm text-zinc-400">
                                F2 has a target price (at full v1 release) of $10 per year for 1 site, $49 for 10 sites and $99 for unlimited sites. These prices are less than 50% of the current ACF pricing plans at the time of this writing. During the prerelease phase our prices will be heavily discounted. Our prices will remain far lower than ACF long-term even if we achieve parity in most or all feature categories. Remember the good old days when you could buy an ACF extension for 10 dollars, and it was Australian Dollars? And then Elliot Condon, the ACF founder and developer showed a lot of class turning all his pro extension customers into lifetime ACF license holders. Today after a couple of sales, ACF still provides great value but its pricing is now similar to most other major WP plugins.
                            </div>
                            <div>Public Form Support</div>
                            <div>Yes</div>
                            <div>No</div>
                            <div className="text-sm text-zinc-400">
                                F2 aims to unify the concept of a "field system" used primarily for admin fields and structured data management, with the concept of a traditional "forms plugin". In other words the goal is to replace both ACF and WPForms, or whatever other combination of fields and forms plugins you might be using today. The key supporting feature for this is entry storage. Note that ACF has long had front-end form support for developers, but this is typically not suitable for "public forms" that need advanced validation, entry storage and a UI suitable for managing form entries.
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </AppTemplate>
    );

}