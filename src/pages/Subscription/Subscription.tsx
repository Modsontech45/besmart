import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Smartphone, 
  Zap, 
  Shield, 
  Cloud, 
  Users, 
  BarChart3,
  CreditCard,
  Star,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Subscription: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'business'>('free');
  const [additionalDevices, setAdditionalDevices] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free',
      name: t('subscription.freePlan'),
      price: 0,
      devices: 4,
      features: [
        t('subscription.features.basicDeviceControl'),
        t('subscription.features.simpleAutomations'),
        t('subscription.features.mobileApp'),
        t('subscription.features.basicSupport'),
      ],
      limitations: [
        t('subscription.limitations.limitedDevices'),
        t('subscription.limitations.basicAutomations'),
        t('subscription.limitations.noAdvancedFeatures'),
      ],
      popular: false,
      color: 'gray'
    },
    {
      id: 'pro',
      name: t('subscription.proPlan'),
      price: 9.99,
      devices: 20,
      features: [
        t('subscription.features.unlimitedAutomations'),
        t('subscription.features.advancedScheduling'),
        t('subscription.features.voiceControl'),
        t('subscription.features.cloudBackup'),
        t('subscription.features.prioritySupport'),
        t('subscription.features.energyAnalytics'),
      ],
      limitations: [],
      popular: true,
      color: 'blue'
    },
    {
      id: 'business',
      name: t('subscription.businessPlan'),
      price: 29.99,
      devices: 100,
      features: [
        t('subscription.features.teamManagement'),
        t('subscription.features.advancedAnalytics'),
        t('subscription.features.apiAccess'),
        t('subscription.features.customIntegrations'),
        t('subscription.features.dedicatedSupport'),
        t('subscription.features.slaGuarantee'),
        t('subscription.features.whiteLabel'),
      ],
      limitations: [],
      popular: false,
      color: 'purple'
    }
  ];

  const calculatePrice = () => {
    const basePlan = plans.find(p => p.id === selectedPlan);
    if (!basePlan) return 0;
    
    const basePrice = basePlan.price;
    const additionalDevicesCost = additionalDevices * 3;
    const monthlyTotal = basePrice + additionalDevicesCost;
    
    return billingCycle === 'yearly' ? monthlyTotal * 12 * 0.8 : monthlyTotal;
  };

  const handleSubscribe = async (planId: string) => {
    toast.success(t('subscription.subscriptionUpdated'));
  };

  const handleDeviceChange = (increment: boolean) => {
    if (increment) {
      setAdditionalDevices(prev => prev + 1);
    } else {
      setAdditionalDevices(prev => Math.max(0, prev - 1));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('subscription.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t('subscription.subtitle')}
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {t('subscription.monthly')}
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === 'yearly'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {t('subscription.yearly')}
            <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
              20% OFF
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 transition-all duration-200 hover:shadow-xl ${
              plan.popular
                ? 'border-blue-500 dark:border-blue-400'
                : 'border-gray-200 dark:border-gray-700'
            } ${
              selectedPlan === plan.id
                ? 'ring-2 ring-blue-500 dark:ring-blue-400'
                : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  {t('subscription.mostPopular')}
                </span>
              </div>
            )}

            <div className="p-6 sm:p-8">
              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${billingCycle === 'yearly' ? (plan.price * 12 * 0.8).toFixed(0) : plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    /{billingCycle === 'yearly' ? t('subscription.year') : t('subscription.month')}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Smartphone className="h-4 w-4" />
                  <span>{plan.devices} {t('subscription.devices')}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{limitation}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedPlan(plan.id as 'free' | 'pro' | 'business');
                  handleSubscribe(plan.id);
                }}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                {plan.id === 'free' ? t('subscription.getCurrentPlan') : t('subscription.upgrade')}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Devices Calculator */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t('subscription.additionalDevices')}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t('subscription.additionalDevicesDesc')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Device Counter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {t('subscription.additionalDevicesCount')}
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleDeviceChange(false)}
                disabled={additionalDevices === 0}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-2xl font-bold text-gray-900 dark:text-white min-w-[3rem] text-center">
                {additionalDevices}
              </span>
              <button
                onClick={() => handleDeviceChange(true)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Price Calculation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {t('subscription.totalCost')}
            </label>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('subscription.basePlan')}:</span>
                  <span className="text-gray-900 dark:text-white">
                    ${plans.find(p => p.id === selectedPlan)?.price || 0}/{t('subscription.month')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {additionalDevices} × $3/{t('subscription.month')}:
                  </span>
                  <span className="text-gray-900 dark:text-white">${additionalDevices * 3}/{t('subscription.month')}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-900 dark:text-white">{t('subscription.total')}:</span>
                    <span className="text-gray-900 dark:text-white">
                      ${calculatePrice()}/{billingCycle === 'yearly' ? t('subscription.year') : t('subscription.month')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {t('subscription.featureComparison')}
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  {t('subscription.feature')}
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">
                  {t('subscription.freePlan')}
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">
                  {t('subscription.proPlan')}
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">
                  {t('subscription.businessPlan')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                { feature: t('subscription.features.deviceLimit'), free: '4', pro: '20', business: '100' },
                { feature: t('subscription.features.automations'), free: t('subscription.basic'), pro: t('subscription.unlimited'), business: t('subscription.unlimited') },
                { feature: t('subscription.features.cloudStorage'), free: '1GB', pro: '10GB', business: '100GB' },
                { feature: t('subscription.features.support'), free: t('subscription.community'), pro: t('subscription.priority'), business: t('subscription.dedicated') },
                { feature: t('subscription.features.analytics'), free: false, pro: true, business: true },
                { feature: t('subscription.features.teamAccess'), free: false, pro: false, business: true },
              ].map((row, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{row.feature}</td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.free === 'boolean' ? (
                      row.free ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300">{row.free}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300">{row.pro}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.business === 'boolean' ? (
                      row.business ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300">{row.business}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {t('subscription.faq')}
        </h3>
        
        <div className="space-y-4">
          {[
            {
              question: t('subscription.faqQuestions.deviceLimit'),
              answer: t('subscription.faqAnswers.deviceLimit')
            },
            {
              question: t('subscription.faqQuestions.additionalCost'),
              answer: t('subscription.faqAnswers.additionalCost')
            },
            {
              question: t('subscription.faqQuestions.cancellation'),
              answer: t('subscription.faqAnswers.cancellation')
            },
            {
              question: t('subscription.faqQuestions.upgrade'),
              answer: t('subscription.faqAnswers.upgrade')
            }
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">{faq.question}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;