smplfitter.tf.bodymodel.BodyModel
=================================

.. py:class:: smplfitter.tf.bodymodel.BodyModel(model_name='smpl', gender='neutral', model_root=None, num_betas=None)

   Represents a statistical body model of the SMPL family.

   The SMPL (Skinned Multi-Person Linear) model provides a way to represent articulated 3D
   human
   meshes through a compact shape vector (beta) and pose (body part rotation) parameters.

   :param model_name: Name of the model type.
   :param gender: Gender of the model, which can be 'neutral', 'female' or 'male'.
   :param model_root: Path to the directory containing model files. By default,
                      {DATA_ROOT}/body_models/{model_name} is used, with the DATA_ROOT environment
                      variable.
   :param num_betas: Number of shape parameters (betas) to use. By default, all available betas
                     are used.


   .. py:method:: __call__(pose_rotvecs = None, shape_betas = None, trans = None, kid_factor = None, rel_rotmats = None, glob_rotmats = None, *, return_vertices = True)

      Calculates the body model vertices, joint positions, and orientations for a batch of
      instances given the input pose, shape, and translation parameters. The rotation may be
      specified as one of three options: parent-relative rotation vectors (`pose_rotvecs`),
      parent-relative rotation matrices (`rel_rotmats`), or global rotation matrices (
      `glob_rotmats`).

      :param pose_rotvecs: Rotation vectors per joint, shaped as (batch_size, num_joints,
                           3) or flattened as (batch_size, num_joints * 3).
      :param shape_betas: Shape coefficients (betas) for the body shape, shaped as (batch_size,
                          num_betas).
      :param trans: Translation vector to apply after posing, shaped as (batch_size, 3).
      :param kid_factor: Adjustment factor for kid shapes, shaped as (batch_size, 1).
      :param rel_rotmats: Parent-relative rotation matrices per joint, shaped as
                          (batch_size, num_joints, 3, 3).
      :param glob_rotmats: Global rotation matrices per joint, shaped as (batch_size, num_joints,
                           3, 3).
      :param return_vertices: Flag indicating whether to compute and return the body model vertices.
                              If only joints and orientations are needed, setting this to False is faster.

      :returns:

                A dictionary containing
                    - 'vertices': 3D body model vertices, shaped as (batch_size, num_vertices, 3), if                     `return_vertices` is True.
                    - 'joints': 3D joint positions, shaped as (batch_size, num_joints, 3).
                    - 'orientations': Global orientation matrices for each joint, shaped as                     (batch_size, num_joints, 3, 3).



   .. py:method:: single(*args, return_vertices=True, **kwargs)

      Calculates the body model vertices, joint positions, and orientations for a single
      instance given the input pose, shape, and translation parameters. The rotation may be
      specified as one of three options: parent-relative rotation vectors (`pose_rotvecs`),
      parent-relative rotation matrices (`rel_rotmats`), or global rotation matrices (
      `glob_rotmats`).

      :param pose_rotvecs: Rotation vectors per joint, shaped as (num_joints, 3) or (num_joints *
                           3,).
      :param shape_betas: Shape coefficients (betas) for the body shape, shaped as (num_betas,).
      :param trans: Translation vector to apply after posing, shaped as (3,).
      :param kid_factor: Adjustment factor for kid shapes, shaped as (1,). Default is None.
      :param rel_rotmats: Parent-relative rotation matrices per joint, shaped as (num_joints, 3, 3).
      :param glob_rotmats: Global rotation matrices per joint, shaped as (num_joints, 3, 3).
      :param return_vertices: Flag indicating whether to compute and return the body model
                              vertices. If only joints and orientations are needed, it is much faster.

      :returns:

                A dictionary containing
                    - **vertices** -- 3D body model vertices, shaped as (num_vertices, 3), if                     `return_vertices` is True
                    - **joints** -- 3D joint positions, shaped as (num_joints, 3)
                    - **orientations** -- Global orientation matrices for each joint, shaped as                     (num_joints, 3, 3)



   .. py:method:: rototranslate(R, t, pose_rotvecs, shape_betas, trans, kid_factor=0, post_translate = True)

      Rotates and translates the body in parametric form.

      If `post_translate` is True, the translation is added after rotation by `R`, as:

      `M(new_pose_rotvec, shape, new_trans) = R @ M(pose_rotvecs, shape, trans) + t`,
      where `M` is the body model forward function.

      If `post_translate` is False, the translation is subtracted before rotation by `R`, as:

      `M(new_pose_rotvec, shape, new_trans) = R @ (M(pose_rotvecs, shape, trans) - t)`

      :param R: Rotation matrix, shaped as (3, 3).
      :param t: Translation vector, shaped as (3,).
      :param pose_rotvecs: Initial rotation vectors per joint, shaped as (num_joints * 3,).
      :param shape_betas: Shape coefficients (betas) for body shape, shaped as (num_betas,).
      :param trans: Initial translation vector, shaped as (3,).
      :param kid_factor: Optional in case of kid shapes like in AGORA. Shaped as (1,).
      :param post_translate: Flag indicating whether to apply the translation after rotation. If
                             True, `t` is added after rotation by `R`; if False, `t` is subtracted before
                             rotation by `R`.

      :returns:

                A tuple containing
                    - **new_pose_rotvec** -- Updated pose rotation vectors, shaped as (num_joints * 3,)
                    - **new_trans** -- Updated translation vector, shaped as (3,)

      .. rubric:: Notes

      Rotating a parametric representation is nontrivial because the global orientation
      (first three rotation parameters) performs the rotation around the pelvis joint
      instead of the origin of the canonical coordinate system. This method takes into
      account the offset between the pelvis joint in the shaped T-pose and the origin of
      the canonical coordinate system.



.. footbibliography::