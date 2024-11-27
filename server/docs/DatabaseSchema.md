## Patient
- id
- patient_schedule_ids
- scheduled_regime_ids

## Pharmacist
- id
- patient_ids
- regimes

## Patient Schedule
- id
- day
- time

## Regime
- id
- patient_id
- day
- time_period
- compartment_id
- medication_ids
- instructions

## Scheduled Regime
- id
- datetime_to_take
- compartment
- instructions

## Record
- id
- patient_id
- date_time_scheduled
- date_time_taken
- was_taken

## Medication
- id
- name
- dose amount
- details