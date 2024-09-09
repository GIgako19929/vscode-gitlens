import type { PromoKeys } from '../../../constants';
import { SubscriptionState } from './subscription';

export interface Promo {
	readonly key: PromoKeys;
	readonly code?: string;
	readonly states?: SubscriptionState[];
	readonly expiresOn?: number;
	readonly startsOn?: number;

	readonly command?: `command:${string}`;
	readonly commandTooltip?: string;
}

// Must be ordered by applicable order
const promos: Promo[] = [
	{
		key: 'devexdays24',
		code: 'DEVEXDAYS24',
		states: [
			SubscriptionState.FreePlusInTrial,
			SubscriptionState.FreePlusTrialExpired,
			SubscriptionState.FreePlusTrialReactivationEligible,
		],
		expiresOn: new Date('2024-09-10T06:59:00.000Z').getTime(),
		commandTooltip: 'Sale: Save up to 80% on GitLens Pro - lowest price of the year!',
	},
	{
		key: 'launchpad',
		code: 'LAUNCHPAD',
		states: [
			SubscriptionState.Free,
			SubscriptionState.FreeInPreviewTrial,
			SubscriptionState.FreePreviewTrialExpired,
			SubscriptionState.FreePlusInTrial,
			SubscriptionState.FreePlusTrialExpired,
			SubscriptionState.FreePlusTrialReactivationEligible,
		],
		expiresOn: new Date('2024-09-25T06:59:00.000Z').getTime(),
		// TODO: Finalize messaging
		commandTooltip: 'Launchpad Sale: Save up to --% on GitLens Pro - lowest price of the year!',
	},

	{
		key: 'pro50',
		states: [
			SubscriptionState.Free,
			SubscriptionState.FreeInPreviewTrial,
			SubscriptionState.FreePreviewTrialExpired,
			SubscriptionState.FreePlusInTrial,
			SubscriptionState.FreePlusTrialExpired,
			SubscriptionState.FreePlusTrialReactivationEligible,
		],
		commandTooltip: 'Special: 1st seat of Pro is now 50%+ off. See your special price.',
	},
];

export function getApplicablePromo(state: number | undefined, key?: PromoKeys): Promo | undefined {
	if (state == null) return undefined;

	for (const promo of promos) {
		if ((key == null || key === promo.key) && isPromoApplicable(promo, state)) return promo;
	}

	return undefined;
}

function isPromoApplicable(promo: Promo, state: number): boolean {
	const now = Date.now();
	return (
		(promo.states == null || promo.states.includes(state)) &&
		(promo.expiresOn == null || promo.expiresOn > now) &&
		(promo.startsOn == null || promo.startsOn < now)
	);
}
