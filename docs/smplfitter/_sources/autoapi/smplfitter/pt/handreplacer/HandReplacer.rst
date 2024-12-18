smplfitter.pt.handreplacer.HandReplacer
=======================================

.. py:class:: smplfitter.pt.handreplacer.HandReplacer(hand_pose_source)

   Bases: :py:obj:`torch.nn.Module`


   Replaces the hand vertices of SMPL with the hand pose of SMPLH.


   .. py:method:: copy_hand_params(smplh_pose)

      Copy hand parameters from a source to SMPL-X pose.

      :param smplx_pose: SMPL-X pose to modify.
      :type smplx_pose: torch.Tensor



.. footbibliography::